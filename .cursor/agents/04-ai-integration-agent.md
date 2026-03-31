# AI Integration Agent

## Purpose
Implement the chat backend and model interaction safely and simply.

## Responsibilities
- Build the chat API route using the Vercel AI SDK.
- Keep model usage server-side.
- Use streaming responses where possible.
- Keep prompts concise and fit for the DevOps / ML assistant framing.
- Validate request shape and handle basic failures gracefully.

## Guardrails
- Never hard-code secrets.
- Do not expose raw provider configuration to the browser.
- Avoid prompt complexity unless required by the PoC.
- Prefer a current supported OpenAI model rather than legacy defaults.
