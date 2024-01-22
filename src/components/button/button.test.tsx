import { composeStories } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vitest } from "vitest";

import * as stories from "./button.stories";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  console.log = vitest.fn();
  it("should render Button", () => {
    render(<Primary />);

    expect(screen.getByText("Hello World")).toBeTruthy();

    fireEvent.click(screen.getByText("Hello World"));
    expect(console.log).toHaveBeenCalledWith("Button clicked");
  });
});
