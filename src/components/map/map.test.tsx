import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./map.stories";

const { Primary } = composeStories(stories);

describe("Primary", () => {
  it("should render map correctly", () => {
    render(<Primary />);

    expect(screen.getByText("Leaflet")).toBeTruthy();
  });
});
