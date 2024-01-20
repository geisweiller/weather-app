import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "./loader";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Loader",
  component: Loader,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
