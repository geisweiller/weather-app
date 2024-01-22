import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./button.stories";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render Primary", () => {
    render(<Primary />);

    expect(screen.getByText("Hello World")).toBeTruthy();
  });
});
