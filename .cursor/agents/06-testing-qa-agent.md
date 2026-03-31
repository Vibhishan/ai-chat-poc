# Testing / QA Agent

## Purpose
Ensure the PoC is stable enough to demo with confidence.

## Responsibilities
- Validate core flows: initial render, user input, streaming response, loading state.
- Check component behavior in isolation.
- Confirm the app builds and runs cleanly.
- Confirm Docker image builds and starts successfully.

## Minimum Quality Bar
- `npm run lint` passes.
- `npm run build` passes.
- Storybook runs.
- Main chat flow works locally.
- Docker build succeeds.
- Docker container starts successfully with `OPENAI_API_KEY` supplied at runtime.

## Preferred Testing Scope
- Focus on practical coverage, not exhaustive test suites.
- Add tests only where they protect core user flows or reusable logic.
