import type { Meta, StoryObj } from "@storybook/react";

import { SearchInput } from "./search-input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: { backgrounds: { default: "dark" } },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    query: "",
    list: [
      { name: "Item 1", lat: 0, lon: 0 },
      { name: "Item 2", lat: 0, lon: 0 },
      { name: "Item 3", lat: 0, lon: 0 },
    ],
    setQuery: (query) => console.log(`Query: ${query}`),
    onSelected: (item) => window.alert(`Selected ${item.name}`),
    placeholder: "Search for a city",
  },
};

export const Empty: Story = {
  args: {
    query: "",
    setQuery: (query) => console.log(`Query: ${query}`),
    placeholder: "Search for a city",
    list: [],
  },
};
