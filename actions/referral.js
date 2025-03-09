"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateReferral(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Write a professional referral message for ${data.candidateName} applying as a ${data.jobTitle} at ${data.company}.
    
    About the referrer:
    - Name: ${user.name}
    - Job Title: ${user.jobTitle || "Not Provided"}
    - Company: ${user.company || "Not Provided"}
    - Professional Relationship: ${data.relationship}

    About the candidate:
    - Skills: ${data.skills?.join(", ") || "Not Provided"}
    - Experience: ${data.experience || "Not Provided"} years
    - Notable achievements: ${data.achievements || "Not Provided"}

    Requirements:
    1. Keep it concise and professional (max 250 words)
    2. Highlight the candidate's strengths and relevance to the job
    3. Use an enthusiastic and supportive tone
    4. Format the message properly
    
    Generate a concise, well-structured referral message.
  `;

  try {
    const result = await model.generateContent(prompt);
    const message =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Referral message generation failed.";

    const referral = await db.referral.create({
      data: {
        message,
        company: data.company,
        jobTitle: data.jobTitle,
        referrer: user.name, // Ensure this field exists in Prisma schema
        userId: user.id,
      },
    });

    return referral;
  } catch (error) {
    console.error("Error generating referral:", error.message);
    throw new Error("Failed to generate referral message");
  }
}

export async function getReferrals() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.referral.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReferral(id) {
  if (!id) throw new Error("Referral ID is required");

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.referral.findUnique({
    where: { id, userId: user.id },
  });
}

export async function deleteReferral(id) {
  if (!id) throw new Error("Referral ID is required");

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.referral.delete({
    where: { id, userId: user.id },
  });
}
