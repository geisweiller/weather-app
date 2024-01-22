import { composeStories } from "@storybook/react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./input.stories";

const { Primary, Empty } = composeStories(stories);

describe("Search Input", () => {
  it("should render a Search Input", () => {
    render(<Primary />);

    expect(screen.getByPlaceholderText("Search for a city")).toBeDefined();
  });

  it("should render a Search Input set a query and show list with itens", () => {
    render(<Primary />);

    const input = screen.getByPlaceholderText("Search for a city");

    fireEvent.change(input, { target: { value: "Item" } });

    waitFor(() => {
      expect(screen.getByText("Item 1")).toBeDefined();
      expect(screen.getByText("Item 2")).toBeDefined();
      expect(screen.getByText("Item 3")).toBeDefined();
    });
  });

  it("should an empty list", () => {
    render(<Empty />);
    const input = screen.getByPlaceholderText("Search for a city");

    fireEvent.change(input, { target: { value: "Item" } });

    waitFor(() => {
      expect(screen.queryByText("No results found")).toBeDefined();
    });
  });
});
