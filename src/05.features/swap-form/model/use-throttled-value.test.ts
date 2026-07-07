import { act, renderHook } from "@testing-library/react";
import { useThrottledValue } from "./use-throttled-value";

describe("useThrottledValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("applies the first change immediately (leading edge)", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 600),
      { initialProps: { value: "" } },
    );

    rerender({ value: "1" });

    expect(result.current).toBe("1");
  });

  it("delays subsequent changes within the interval (trailing edge)", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 600),
      { initialProps: { value: "" } },
    );

    rerender({ value: "1" });
    rerender({ value: "12" });
    rerender({ value: "123" });

    expect(result.current).toBe("1");

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current).toBe("123");
  });

  it("does not emit more than one update per interval", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 600),
      { initialProps: { value: "" } },
    );

    rerender({ value: "1" });
    rerender({ value: "12" });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("1");

    rerender({ value: "123" });
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe("1");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("123");
  });
});
