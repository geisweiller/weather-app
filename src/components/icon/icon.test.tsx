import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./icon.stories";

const { Primary } = composeStories(stories);

describe("Icon", () => {
  it("should render image", () => {
    render(<Primary />);

    expect(screen.getAllByRole("img")).toBeTruthy();
  });
});
