import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import LandingSteps from "./landing-steps";

const MESSAGES = {
  landing: {
    steps: {
      title: "Three steps to drops",
      tag: "It's that simple",
      asideTitle: "Create, add, share.",
      asideText: "Everything you need to start receiving gifts without the friction",
      brand: "Gifty",
      goToStep: "Go to step {number}",
      step1: {
        title: "Create your account",
        text: "Sign up in under a minute. Claim your unique name and make the space yours.",
      },
      step2: {
        title: "Add your wishes",
        text: "Create lots: add a photo, title, price, and link to the item. Dream big — from a cup of coffee to a brand-new microphone.",
      },
      step3: {
        title: "Share with your fans",
        text: "Copy your link and drop it in your bio, stories, or video description. Fans visit your storefront and gift you exactly what you want.",
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

const renderSteps = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={MESSAGES}>
      <LandingSteps />
    </NextIntlClientProvider>,
  );
};

describe("LandingSteps", () => {
  it("renders the headline, tag and the first step card", () => {
    renderSteps();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Three steps to drops",
    );
    expect(screen.getByText("It's that simple")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByText("Gifty")).toBeInTheDocument();
  });

  it("switches to another step when its progress segment is clicked", async () => {
    renderSteps();

    fireEvent.click(screen.getByRole("button", { name: "Go to step 2" }));

    expect(await screen.findByText("02")).toBeInTheDocument();
    expect(await screen.findByText("Add your wishes")).toBeInTheDocument();
  });

  it("renders three progress segments", () => {
    renderSteps();

    expect(screen.getByRole("button", { name: "Go to step 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to step 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to step 3" })).toBeInTheDocument();
  });
});
