import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vitest } from "vitest";

import EmptyState from "./empty-state";

describe("EmptyState", () => {
  it("renders description and button text", () => {
    const description = "No data available";
    const buttonText = "Refresh";
    const onClick = vitest.fn();

    render(
      <EmptyState
        description={description}
        buttonText={buttonText}
        onClick={onClick}
      />
    );

    const descriptionElement = screen.getByText(description);
    const buttonElement = screen.getByText(buttonText);

    expect(descriptionElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  it("calls onClick when button is clicked", () => {
    const description = "No data available";
    const buttonText = "Refresh";
    const onClick = vitest.fn();

    render(
      <EmptyState
        description={description}
        buttonText={buttonText}
        onClick={onClick}
      />
    );

    const buttonElement = screen.getByText(buttonText);

    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });
});
