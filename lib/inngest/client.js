import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "elevatex",
  name: "ElevateX",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});