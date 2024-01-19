// component.tsx
export function component(name) {
  return `import React from 'react';


interface ${name}Props {
  /**
   * This explains foo.
   */
  foo: boolean;
  /**
   * This explains bar.
   */
  bar: string;
  /**
   * This explains baz.
   */
  baz: string;
}

export const ${name} = ({ foo, bar, baz }: ${name}Props) => {
  return(
  <div>
    <p>Hello 👋, I am a ${name} component.</p>
    <div>{foo ? bar : baz}</div>
  </div>
)
};

`;
}

// component.stories.jsx
export function story(name, fileName) {
  return `import type { Meta, StoryObj } from "@storybook/react";

import { ${name} } from "./${fileName}";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/${name}",
  component: ${name},
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    foo: true,
    bar: "bar",
    baz: "baz",
  },
};

`;
}

// component.test.tsx
export function test(fileName) {
  return `import React from 'react';

import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./${fileName}.stories";
import { composeStories } from "@storybook/react";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render Primary", () => {
    render(<Primary />);

    expect(screen.getByText("bar")).toBeTruthy();
  });
});
`;
}
