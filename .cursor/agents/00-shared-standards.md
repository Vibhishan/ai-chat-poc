# Shared Standards Agent

## Project Context
This project is a containerized Next.js AI chat application built to demonstrate a full product-development workflow:
- reusable UI components
- a lightweight design language
- Storybook-based component isolation
- OpenAI-powered chat via the Vercel AI SDK
- production readiness via Docker

The goal is to build a PoC that feels clean, credible, and easy to extend into a real product.

## Operating Principles
- Prefer simple, production-shaped solutions over clever abstractions.
- Keep design, implementation, and infrastructure aligned.
- Build reusable UI primitives before expanding page-level complexity.
- Use Storybook to validate UI states in isolation.
- Keep secrets server-side only. Never expose API keys in client code.
- Make the smallest change that keeps the codebase clean and extensible.

## Shared Standards
### Component Standards
- Reusable UI belongs in `components/`.
- Components should have clear props and minimal assumptions.
- Add Storybook stories for components that represent the design language.

### Styling Standards
- Use Tailwind CSS.
- Keep the UI clean, modern, and minimal.
- Prioritize consistency over novelty.
- Add variants only when there is a real reuse case.

### Code Standards
- Keep functions and components small.
- Prefer explicitness over abstraction.
- Avoid dead code, commented-out code, and placeholder logic left in final commits.
- When changing behavior, update the closest relevant docs or stories.

### AI Standards
- Provider access stays server-side.
- Environment variables are required for secrets.
- Model and prompt choices should be easy to swap later.

## Recommended Delivery Order
1. Scaffold the Next.js app.
2. Set up Storybook.
3. Build `ChatMessage` and `ChatInput`.
4. Create stories for both components.
5. Implement the chat page using those components.
6. Add the AI route.
7. Verify local end-to-end behavior.
8. Add standalone output and Docker support.
9. Verify lint, build, Storybook, and container run.
10. Polish documentation and demo flow.

## Definition of Done
The project is ready when:
- the UI is composed from reusable components
- Storybook documents the main component states
- the chat works end to end with a server-side AI route
- the app builds cleanly
- the Docker image builds and runs
- the codebase is easy to explain to design, product, and engineering stakeholders

## What to Avoid
- Over-engineering the design system
- Adding unnecessary dependencies
- Embedding secrets in code or images
- Building features that are not directly useful for the PoC story
- Letting page-level code become the only place where UI patterns live

## Default Mindset
Build a PoC that is:
- simple enough to understand quickly
- polished enough to demo confidently
- structured enough to scale into a real product
