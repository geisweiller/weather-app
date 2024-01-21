import type { Meta, StoryObj } from "@storybook/react";

import { Toggler } from "./toggler";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Toggler",
  component: Toggler,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Toggler>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: [
      {
        label: "Option 1",
        onClick: () => console.log("Option 1 clicked"),
        selected: true,
      },
      {
        label: "Option 2",
        onClick: () => console.log("Option 2 clicked"),
        selected: false,
      },
    ],
  },
};
