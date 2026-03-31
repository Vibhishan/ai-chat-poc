import type { ChangeEvent, FormEvent } from "react";

export interface ChatInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 rounded-2xl border border-gray-200 bg-white p-2">
      <input
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        className="flex-1 rounded-xl border border-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
