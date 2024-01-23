import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./loader.stories";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render Loader", () => {
    render(<Primary />);

    expect(screen.getByText("Loading...")).toBeTruthy();
  });
});
