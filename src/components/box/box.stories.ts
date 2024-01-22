import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./box";

const meta = {
  title: "Components/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Hello 👋, I am a Box component.",
  },
};
