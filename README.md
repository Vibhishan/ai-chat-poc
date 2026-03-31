# AI Chat PoC

A containerized Next.js AI chat application that demonstrates a full product-development workflow:

- reusable conversational UI primitives
- Storybook-based component isolation
- streaming chat responses via the Vercel AI SDK + OpenAI
- production-shaped Docker deployment

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Storybook
- Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- Docker

## Prerequisites

- Node.js 18+
- npm
- Docker Desktop
- OpenAI API key

## Environment setup

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Set your key in `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Storybook

Start Storybook:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) and review:

- `AI/ChatMessage`
- `AI/ChatInput`

## Production build

```bash
npm run build
npm run start
```

## Docker

Build the image:

```bash
docker build -t ai-chat-template .
```

Run the container:

```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=your_openai_api_key_here ai-chat-template
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
npm run build-storybook
```
