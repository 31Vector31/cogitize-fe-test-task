import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import LandingCover from "./landing-cover";

const MESSAGES = {
  landing: {
    nav: {
      home: "Home",
      howItWorks: "How it works",
      features: "Features",
      forWhom: "For whom",
    },
    logIn: "Log in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    note: "Independent minds only",
    tagline: "Phase is your personal editorial storefront",
    cta: "Create you Phase",
    menuCta: "Create you Gifty",
    marquee: {
      identity: "YOUR IDENTITY",
      freeForever: "FREE FOREVER",
      share: "SHARE WITH YOUR AUDIENCE",
    },
  },
};

const renderCover = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={MESSAGES}>
      <LandingCover />
    </NextIntlClientProvider>,
  );
};

describe("LandingCover", () => {
  it("renders the header with navigation and login", () => {
    renderCover();

    expect(screen.getByText("PHASE")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "How it works" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders the hero content", () => {
    renderCover();

    expect(
      screen.getByText("Phase is your personal editorial storefront"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create you Phase" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Independent minds only")).toBeInTheDocument();
    expect(screen.getByAltText("PHASE")).toBeInTheDocument();
  });

  it("opens and closes the mobile menu", async () => {
    renderCover();

    expect(screen.queryByText("01")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(
      screen.getAllByRole("button", { name: /How it works/ }),
    ).toHaveLength(2);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create you Gifty/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));

    await waitFor(() => {
      expect(screen.queryByText("01")).not.toBeInTheDocument();
    });
  });

  it("closes the mobile menu when a navigation item is clicked", async () => {
    renderCover();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const menuItems = screen.getAllByRole("button", { name: /Features/ });
    fireEvent.click(menuItems[menuItems.length - 1]);

    await waitFor(() => {
      expect(screen.queryByText("01")).not.toBeInTheDocument();
    });
  });

  it("renders the marquee with duplicated groups for a seamless loop", () => {
    renderCover();

    expect(screen.getAllByText("YOUR IDENTITY").length).toBeGreaterThan(1);
    expect(screen.getAllByText("FREE FOREVER").length).toBeGreaterThan(1);
    expect(
      screen.getAllByText("SHARE WITH YOUR AUDIENCE").length,
    ).toBeGreaterThan(1);
  });
});
