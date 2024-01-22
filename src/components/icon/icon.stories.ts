import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    code: "10d",
  },
};
