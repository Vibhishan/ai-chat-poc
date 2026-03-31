export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`mb-4 flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-900"
        }`}
      >
        <p
          className={`mb-1 text-xs font-semibold uppercase tracking-wide ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {isUser ? "You" : "AI Assistant"}
        </p>
        <p className="whitespace-pre-wrap text-sm leading-6">{content}</p>
      </article>
    </div>
  );
}
