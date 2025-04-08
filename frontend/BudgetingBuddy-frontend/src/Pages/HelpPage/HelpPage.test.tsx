import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Help from "./help";
import "@testing-library/jest-dom/vitest";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Help Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the Help component correctly with FAQs", () => {
    render(
      <MemoryRouter>
        <Help />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /Help & FAQs/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /← Back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /How do I create a new budget\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Can I import my financial data\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Where can I learn more tips\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/click the "Create Budget" button/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/supports importing CSV files/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Check out our blog for budgeting tips/i),
    ).toBeInTheDocument();
  });

  it("navigates back when the back button is clicked", () => {
    render(
      <MemoryRouter>
        <Help />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", { name: /← Back/i });

    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
