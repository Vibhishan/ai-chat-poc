import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const messages = body?.messages;

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid request body. Expected a messages array." },
        { status: 400 },
      );
    }

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      system:
        "You are a helpful DevOps and ML engineering assistant. Give clear, concise, practical guidance.",
      messages: await convertToModelMessages(messages as UIMessage[]),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      { error: "Something went wrong while generating a response." },
      { status: 500 },
    );
  }
}
