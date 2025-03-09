import { NextResponse } from "next/server";

export async function POST(req) {
  const { company, referrer, jobRole } = await req.json();

  const referralMessage = `
  Dear ${referrer},

  I hope you're doing well. I'm interested in applying for the "${jobRole}" role at ${company} and would appreciate your referral. If you're comfortable, I’d be grateful for your support. Please let me know if you need any details from my end.

  Looking forward to your response.

  Best regards,
  [Your Name]
  `;

  return NextResponse.json({ message: referralMessage });
}
