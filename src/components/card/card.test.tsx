import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./card.stories";
import { composeStories } from "@storybook/react";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render Primary", () => {
    render(<Primary />);

    expect(screen.getByText("Hello World")).toBeTruthy();
  });
});
