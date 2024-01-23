import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { expect, describe, it, beforeEach, vi } from "vitest";

import Locations from "./locations";
import locationsMock from "../../services/mocks/locations.mock";

const queryClient = new QueryClient();

describe("Locations", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Locations />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  beforeEach(() => {
    vi.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: locationsMock,
      })
    );
  });

  it("renders the Weather heading", () => {
    const headingElement = screen.getByText(/Weather/i);
    expect(headingElement).toBeTruthy();
  });

  it("renders the search input", () => {
    const searchInput = screen.getByPlaceholderText(/Search for a city/i);
    expect(searchInput).toBeTruthy();
  });

  it("updates the query state when typing in the search input", async () => {
    const searchInput = screen.getByPlaceholderText(/Search for a city/i);
    fireEvent.change(searchInput, { target: { value: "New York" } });
    expect(searchInput).toHaveProperty("value", "New York");

    expect(screen.getByText("Loading...")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText("New York County")).toBeTruthy();
    });
  });

  // Add more tests for other functionality in the Locations component
});
