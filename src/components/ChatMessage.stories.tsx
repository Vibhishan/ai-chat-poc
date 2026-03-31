import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessage } from "./ChatMessage";

const meta: Meta<typeof ChatMessage> = {
  title: "AI/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Hello, what is the status of my deployment?",
  },
};

export const AgentMessage: Story = {
  args: {
    role: "assistant",
    content:
      "Your deployment is running in a healthy state. Build completed, container is online, and checks are passing.",
  },
};
