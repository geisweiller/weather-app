import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./icon.stories";
import { composeStories } from "@storybook/react";

const { Primary } = composeStories(stories);

describe("Icon", () => {
  it("should render image", () => {
    render(<Primary />);

    expect(screen.getAllByRole("img")).toBeTruthy();
  });
});
