# Building the AI Chat Proof of Concept (PoC)

## Overview

This document outlines a practical, end-to-end plan for building a containerized AI chat application using Next.js, Storybook, Tailwind CSS, and the Vercel AI SDK.

The goal of this PoC is not only to demonstrate AI integration, but to show a **holistic product-development workflow**:

- **Design language first** through reusable UI primitives
- **Component isolation** through Storybook
- **Application integration** through Next.js
- **AI capability** through OpenAI + Vercel AI SDK
- **Production readiness** through Docker

This approach helps teams move faster by creating a shared foundation across product, design, frontend, platform, and ML engineering.

---

## Objectives

By the end of this PoC, we will have:

1. A working AI chat interface in Next.js
2. Reusable UI components that can be tested in isolation
3. A lightweight API route that streams model responses
4. A containerized deployment path suitable for engineering review
5. A clear example of how a design language accelerates product delivery

---

## Why this PoC matters

This PoC demonstrates two core frontend strategy principles:

### 1. Design language accelerates development
A consistent set of reusable components reduces decision fatigue, improves UX consistency, and makes it easier to scale from prototype to product.

### 2. Standardized infrastructure reduces delivery risk
By building with production-oriented patterns from the start, we reduce the gap between prototype and deployable application.

---

## Tech Stack

- **Next.js** for the application framework
- **React + TypeScript** for UI development
- **Tailwind CSS** for styling
- **Storybook** for isolated component development and documentation
- **Vercel AI SDK** for streaming AI responses
- **OpenAI API** for model inference
- **Docker** for containerized deployment

---

## Prerequisites

Before starting, ensure the following are installed:

- Node.js (v18+)
- npm
- Docker Desktop
- An OpenAI API key

---

# Phase 1: Scaffold the Application

We begin by creating a modern Next.js app with TypeScript and Tailwind CSS.

## 1. Initialize the project

Run:

```bash
npx create-next-app@latest ai-chat-poc
```

Use the following options:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **No**
- App Router: **Yes**
- Customize default import alias: **No**

Then enter the project directory:

```bash
cd ai-chat-poc
```

## 2. Install the AI SDK

```bash
npm install ai @ai-sdk/openai
```

## 3. Initialize Storybook

```bash
npx storybook@latest init
```

> Note: Depending on the installed version, Storybook may recommend a Next.js Vite-based setup. Use the modern recommended option when available.

---

# Phase 2: Establish the Design Language

The purpose of this phase is to define the initial UI building blocks for the chat experience.

Rather than jumping straight into page-level implementation, we first create reusable components that can evolve into a broader design system.

## Initial component set

We will start with:

- `ChatMessage`
- `ChatInput`

These components represent the first step toward a lightweight design language for conversational UI.

### Design language principles for this PoC

- Clear role distinction between user and assistant
- Consistent spacing, typography, and corner radius
- Reusable interaction patterns
- Simple visual hierarchy
- Easy extension into themes, tokens, and variants later

---

## 2.1 Create the components directory

```bash
mkdir components
```

---

## 2.2 Create `ChatMessage`

Create `components/ChatMessage.tsx`:

```tsx
import React from 'react';

export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-black rounded-bl-none'
        }`}
      >
        <p className="text-sm font-medium mb-1">{isUser ? 'You' : 'AI Agent'}</p>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
```

---

## 2.3 Create the Storybook story for `ChatMessage`

Create `components/ChatMessage.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'AI/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello, what is the status of my deployment?',
  },
};

export const AgentMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Your deployment is currently running securely in a Docker container!',
  },
};
```

---

## 2.4 Create `ChatInput`

Create `components/ChatInput.tsx`:

```tsx
import React from 'react';

export interface ChatInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};
```

---

## 2.5 Create the Storybook story for `ChatInput`

Create `components/ChatInput.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';

const meta: Meta<typeof ChatInput> = {
  title: 'AI/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: (e) => e.preventDefault(),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    value: 'Tell me the deployment status',
    onChange: () => {},
    onSubmit: (e) => e.preventDefault(),
    isLoading: true,
  },
};
```

---

## 2.6 Validate the component library

Run:

```bash
npm run storybook
```

This allows product and design stakeholders to review the UI independently of backend logic.

---

# Phase 3: Add the AI Integration

Now we connect the frontend to a streaming AI backend route.

## 3.1 Set environment variables

Create `.env.local` in the project root:

```env
OPENAI_API_KEY=your_actual_api_key_here
```

---

## 3.2 Create the API route

Create `app/api/chat/route.ts`:

```tsx
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4.1-mini'),
    system: 'You are a helpful DevOps and ML engineering assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

> Note: Use a current supported OpenAI model appropriate for your account, latency target, and cost profile.

---

## 3.3 Build the main chat page

Replace `app/page.tsx` with:

```tsx
'use client';

import { useChat } from 'ai/react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold">AI Agent Template</h1>
        <p className="text-gray-500">Next.js + AI SDK + Docker</p>
      </header>

      <main className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">Start a conversation...</div>
        ) : (
          messages.map((m) => (
            <ChatMessage
              key={m.id}
              role={m.role as 'user' | 'assistant'}
              content={m.content}
            />
          ))
        )}

        {isLoading && <div className="text-gray-400 text-sm">AI is typing...</div>}
      </main>

      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
```

---

## 3.4 Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

At this point, the team can test the full application flow end to end.

---

# Phase 4: Productionize with Docker

This phase shows how the application can move from local prototype to deployable service.

## 4.1 Enable standalone output

Update `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

---

## 4.2 Create `.dockerignore`

Create `.dockerignore` in the root:

```dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.next
.git
.env*
storybook-static
```

---

## 4.3 Create the Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

---

# Phase 5: Build and Run the Container

## 5.1 Build the Docker image

```bash
docker build -t ai-chat-template .
```

## 5.2 Run the container

```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=your_actual_api_key_here ai-chat-template
```

## 5.3 Verify the running app

Open:

```text
http://localhost:3000
```

You should now be interacting with the AI chat application running inside a production-ready Docker container.

---

# How this demonstrates the full product-development lifecycle

This PoC is intentionally structured to show more than just implementation.

## Design
Storybook and reusable components establish a shared design language early.

## Frontend engineering
Next.js integrates those components into an actual user workflow.

## AI engineering
The API route adds model-powered behavior through a streaming interface.

## Platform engineering
Docker creates a clear path to isolated, repeatable deployment.

## Cross-functional collaboration
Because components are defined in isolation and infrastructure is standardized, design, product, and engineering can work in parallel with less friction.

---

# Suggested demo narrative for stakeholders

When presenting this PoC, frame it as:

1. **We start with reusable UI primitives**
   - Faster iteration
   - Better consistency
   - Easier collaboration between design and engineering

2. **We validate the interface in isolation**
   - Storybook becomes the shared review surface

3. **We connect the product shell to AI capability**
   - The app gains real functionality without changing the component model

4. **We prove deployability early**
   - Docker shows this is not just a prototype, but a deployable system

5. **We create a foundation for scale**
   - More components
   - More workflows
   - Better observability
   - Authentication
   - Safety and evaluation layers

---

# Future Extensions

This PoC can later be extended with:

- Design tokens and theming
- Conversation persistence
- Authentication and role-based access
- Usage analytics and observability
- Guardrails and moderation
- Retrieval-augmented generation (RAG)
- Tool calling / agent workflows
- CI/CD pipeline integration
- Kubernetes or managed deployment targets

---

# Success Criteria

This PoC is successful if it shows:

- A functional chat experience
- A reusable UI component model
- A credible design-to-product workflow
- A production-oriented deployment pattern
- A clear path from prototype to scalable application

---

# Final Takeaway

The purpose of this PoC is not just to build a chatbot.

It is to demonstrate that when teams invest in:
- a reusable design language,
- isolated component development,
- clean application architecture,
- and production-ready infrastructure,

they can move from idea to deployable product much faster and with less rework.
