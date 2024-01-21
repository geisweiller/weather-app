import type { Meta, StoryObj } from "@storybook/react";

import { Toggler } from "./toggler";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Toggler",
  component: Toggler,
} satisfies Meta<typeof Toggler>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: [
      {
        id: "1",
        label: "Option 1",
        selected: true,
      },
      {
        id: "2",
        label: "Option 2",
        selected: false,
      },
    ],
    onClick: (id) => console.log(`Option ${id} clicked`),
  },
};
