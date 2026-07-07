import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import LandingMission from "./landing-mission";

const MESSAGES = {
  landing: {
    mission: {
      caption: "Creators inspire millions every single day",
      title: "Phase is a space for creators to be seen",
      tribeTitle1: "Just you and your tribe",
      tribeTitle2: "Zero algorithm noise.",
      tribeText:
        "Only your raw concepts, your curated drops, and the community that stands by your side",
    },
  },
};

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

beforeAll(() => {
  global.IntersectionObserver = IntersectionObserverMock;
});

const renderMission = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={MESSAGES}>
      <LandingMission />
    </NextIntlClientProvider>,
  );
};

describe("LandingMission", () => {
  it("renders the caption and the headline word by word", () => {
    renderMission();

    expect(screen.getByText("Creators")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Phase is a space for creators to be seen",
    );
  });

  it("renders the overlay text on the photo collage", () => {
    renderMission();

    expect(screen.getByText("Just you and your tribe")).toBeInTheDocument();
    expect(screen.getByText("Zero algorithm noise.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Only your raw concepts, your curated drops, and the community that stands by your side",
      ),
    ).toBeInTheDocument();
  });

  it("renders as a landmark section", () => {
    const { container } = renderMission();

    expect(container.querySelector("section")).not.toBeNull();
  });
});
