import type { Meta, StoryObj } from "@storybook/react";

import { Toggler } from "./toggler";

const meta = {
  title: "Components/Toggler",
  component: Toggler,
} satisfies Meta<typeof Toggler>;

export default meta;
type Story = StoryObj<typeof meta>;

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
