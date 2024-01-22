import { composeStories } from "@storybook/react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./input.stories";

const { Primary } = composeStories(stories);

describe("Search Input", () => {
  it("should render a Search Input", () => {
    render(<Primary />);
    const input = screen.getByPlaceholderText("Search for a city");

    fireEvent.change(input, { target: { value: "Item" } });
    expect(input).toBeDefined();
    waitFor(() => {
      expect(input).toHaveProperty("value", "Item");
    });
  });
});
