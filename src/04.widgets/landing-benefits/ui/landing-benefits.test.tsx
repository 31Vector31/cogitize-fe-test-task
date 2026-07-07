import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import LandingBenefits from "./landing-benefits";

const MESSAGES = {
  landing: {
    benefits: {
      exhibition: {
        description: "A premium editorial layout featuring your aesthetic",
        descriptionMobile: "Your own page with your avatar, name, and wishlist.",
        title: "Exhibition",
        tag: "100% your DNA",
      },
      capsules: {
        description: "Publish, modify your capsule drops instantly.",
        descriptionMobile: "Add, edit, or remove wishes anytime.",
        title: "Capsules",
        tag: "No messy feeds",
      },
      telemetry: {
        description: "Visitors get live updates on what’s currently available.",
        descriptionMobile: "Fans see what’s taken.",
        title: "Telemetry",
        tag: "No missed drops",
      },
      domain: {
        description: "A short, clean web address — phase.com/your-name.",
        descriptionMobile: "One short link — phase.com/your-name.",
        title: "Domain",
        tag: "Instant access",
      },
      impact: {
        description: "Discover what your audience interacts with most.",
        descriptionMobile: "See how many people visited your storefront.",
        title: "Impact",
        tag: "Deep audience data",
      },
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

const renderBenefits = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={MESSAGES}>
      <LandingBenefits />
    </NextIntlClientProvider>,
  );
};

const getRow = (title: string) => {
  const rowElement = screen.getByText(title).closest("[data-active]");
  if (!rowElement) throw new Error(`Row for "${title}" not found`);
  return rowElement;
};

describe("LandingBenefits", () => {
  it("renders all five benefit rows with descriptions and tags", () => {
    renderBenefits();

    for (const title of [
      "Exhibition",
      "Capsules",
      "Telemetry",
      "Domain",
      "Impact",
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(screen.getByText("100% your DNA")).toBeInTheDocument();
    expect(screen.getByText("Deep audience data")).toBeInTheDocument();
  });

  it("highlights the first row by default", () => {
    renderBenefits();

    expect(getRow("Exhibition")).toHaveAttribute("data-active", "true");
    expect(getRow("Capsules")).toHaveAttribute("data-active", "false");
  });

  it("highlights a row on hover and releases it on leave", () => {
    renderBenefits();

    fireEvent.mouseEnter(getRow("Domain"));

    expect(getRow("Domain")).toHaveAttribute("data-active", "true");
    expect(getRow("Exhibition")).toHaveAttribute("data-active", "false");

    fireEvent.mouseLeave(getRow("Domain"));

    expect(getRow("Domain")).toHaveAttribute("data-active", "true");
  });
});
