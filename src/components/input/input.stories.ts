import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    query: "",
    setQuery: (query) => console.log(`Query: ${query}`),
    placeholder: "Search for a city",
  },
};
