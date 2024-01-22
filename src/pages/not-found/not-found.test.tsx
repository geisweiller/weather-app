import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it("should render NotFound and click the button", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const buttonElement = getByText("Back to search");

    buttonElement.click();
    expect(buttonElement).toBeTruthy();
  });
});
