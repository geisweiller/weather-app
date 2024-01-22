import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "./loader";
const meta = {
  title: "Components/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
