import { renderHook, act } from "@testing-library/react-hooks";
import { expect, describe, beforeEach, it } from "vitest";

import { useLocalStorage } from "./use-local-storage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return initial value when no value is stored in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    expect(result.current.storedValue).toBe("initialValue");
  });

  it("should return value from localStorage if it exists", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    const parsedValue = JSON.parse(result.current.storedValue);

    expect(parsedValue).toBe("storedValue");
  });

  it("should update value in localStorage when setValue is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    act(() => {
      result.current.setValue("updatedValue");
    });

    expect(result.current.storedValue).toBe("updatedValue");
    expect(localStorage.getItem("testKey")!).toBe("updatedValue");
  });

  it("should remove value from localStorage when remove item", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));

    renderHook(() => useLocalStorage("testKey", "initialValue"));

    act(() => {
      window.localStorage.removeItem("testKey");
    });

    expect(localStorage.getItem("testKey")).toBe(null);
  });
});
