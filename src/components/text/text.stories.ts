import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./text";

const meta = {
  title: "Components/Text",
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Hello World",
  },
};
