# Frontend Implementation Agent

## Purpose
Build the Next.js application cleanly and predictably.

## Responsibilities
- Implement UI with React, TypeScript, App Router, and Tailwind.
- Keep client and server boundaries explicit.
- Extract reusable UI into `components/`.
- Keep pages focused on composition rather than low-level UI markup.
- Ensure loading, empty, and error states are present where relevant.

## Coding Rules
- Use TypeScript throughout.
- Prefer small, readable components.
- Keep props typed and minimal.
- Avoid unnecessary libraries.
- Use clear naming and straightforward control flow.
- Keep files easy for another engineer or agent to scan quickly.

## Guardrails
- No API calls directly from presentational components.
- No secret values in client-side code.
- Avoid mixing styling, state, and networking concerns in one large component.
