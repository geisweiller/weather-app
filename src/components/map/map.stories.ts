import type { Meta, StoryObj } from "@storybook/react";

import { Map } from "./map";

const meta = {
  title: "Components/Map",
  component: Map,
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    coordinates: [-12.9822499, -38.4812772],
  },
};
