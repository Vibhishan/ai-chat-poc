"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";

import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";

type ChatRole = "user" | "assistant";

function getMessageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

export default function Home() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextMessage = input.trim();
    if (!nextMessage || isLoading) return;

    setInput("");
    await sendMessage({ text: nextMessage });
  };

  const visibleMessages = messages.filter(
    (message): message is typeof message & { role: ChatRole } =>
      message.role === "user" || message.role === "assistant",
  );

  return (
    <div className="mx-auto flex h-screen w-full max-w-3xl flex-col gap-4 p-4">
      <header className="pt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">AI Chat PoC</h1>
        <p className="mt-1 text-sm text-gray-500">Next.js + Vercel AI SDK + Docker</p>
      </header>

      <main className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50 p-4">
        {visibleMessages.length === 0 ? (
          <p className="mt-24 text-center text-sm text-gray-400">Start a conversation...</p>
        ) : (
          visibleMessages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={getMessageText(message.parts)}
            />
          ))
        )}

        {isLoading && <p className="text-xs text-gray-400">AI is typing...</p>}
        {error && <p className="text-xs text-red-600">Request failed. Please try again.</p>}
      </main>

      <ChatInput value={input} onChange={handleInputChange} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
