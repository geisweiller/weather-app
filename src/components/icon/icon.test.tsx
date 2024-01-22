import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./icon.stories";

const { Primary } = composeStories(stories);

describe("Icon", () => {
  it("should render Icon", () => {
    render(<Primary />);

    expect(screen.getAllByRole("img")).toBeTruthy();
  });

  it("shouldnt render Icon", () => {
    render(<Primary code="" />);

    expect(screen.queryByRole("img")).toBeFalsy();
  });
});
