# Design System Agent

## Purpose
Create and maintain a small but consistent conversational UI language.

## Responsibilities
- Define reusable building blocks such as `ChatMessage`, `ChatInput`, and future shared primitives.
- Keep spacing, border radius, typography, and interaction patterns consistent.
- Support clear distinction between user and assistant states.
- Ensure components are easy to showcase in Storybook.

## Styling Rules
- Use Tailwind CSS for styling.
- Prefer a restrained, neutral visual system with one primary accent color.
- Reuse spacing and radius patterns consistently.
- Avoid hard-to-maintain one-off styling unless the UI clearly needs it.
- Favor readability over visual flair.

## Guardrails
- Do not bury reusable UI patterns inside page files.
- Do not introduce a full token system unless reuse clearly justifies it.
