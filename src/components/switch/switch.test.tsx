import { composeStories } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vitest } from "vitest";

import * as stories from "./switch.stories";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render Switch", () => {
    render(<Primary />);

    expect(screen.getByText("Option 1")).toBeTruthy();
    expect(screen.getByText("Option 2")).toBeTruthy();
  });

  it("should render Switch and switch between options", () => {
    console.log = vitest.fn();
    render(<Primary />);

    fireEvent.click(screen.getByText("Option 2"));
    expect(console.log).toHaveBeenCalledWith("Option 2 clicked");
  });
});
