import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./box";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Box",
  component: Box,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Hello 👋, I am a Box component.",
  },
};
