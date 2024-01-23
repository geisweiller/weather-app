import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import Weather from "./weather";
import locationsMock from "../../services/mocks/locations.mock";
import weatherMock from "../../services/mocks/weather.mock";

describe("Weather", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: weatherMock,
      })
    );
  });

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            {
              state: {
                location: locationsMock[0],
                unitValue: "metric",
              },
            },
          ]}
        >
          <Weather />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it("renders loading state when weather data is loading", () => {
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  // it("renders error state when weather data fetch fails", () => {

  //   expect(screen.getByText("Something went wrong, please try again.")).toBeInTheDocument();
  //   expect(screen.getByText("Back to search")).toBeInTheDocument();
  // });

  it("renders weather data when successfully fetched", async () => {
    await waitFor(() => {
      expect(screen.getByText("New York County (New York, US)")).toBeTruthy();
      expect(screen.getByText("1°C")).toBeTruthy();
      expect(screen.getByText("broken clouds")).toBeTruthy();
    });

    // Add your assertions here to check if the weather data is rendered correctly
  });
});
