import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { expect, describe, it, beforeEach, vi } from "vitest";

import StarredLocation from "./starred-location";
import locationsMock from "../../services/mocks/locations.mock";
import weatherMock from "../../services/mocks/weather.mock";
import { GeocodingService } from "../../services/types/geocoding";

const queryClient = new QueryClient();
describe("StarredLocation", () => {
  const location = locationsMock[0] as unknown as GeocodingService;
  const unitValue = "metric";

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
        <MemoryRouter>
          <StarredLocation location={location} unitValue={unitValue} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it("renders the location name and weather information", async () => {
    await waitFor(() => {
      expect(screen.getByText("New York County (New York, US)")).toBeTruthy();

      expect(screen.getByText("broken clouds")).toBeTruthy();

      expect(screen.getByText("1°C")).toBeTruthy();
    });
  });
});
