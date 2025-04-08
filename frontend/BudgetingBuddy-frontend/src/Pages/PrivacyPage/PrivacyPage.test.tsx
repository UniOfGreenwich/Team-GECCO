import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Privacy from "./privacy";
import "@testing-library/jest-dom/vitest";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Privacy Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders the Privacy component correctly", () => {
    render(<Privacy />);

    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /← Back/i });
    expect(backButton).toBeInTheDocument();

    expect(
      screen.getByText(/At BudgetingBuddy, we value your privacy./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Information We Collect:/i)).toBeInTheDocument();
    expect(screen.getByText(/How We Use It:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/privacy@budgetingbuddy\.com/i),
    ).toBeInTheDocument();
  });

  it("navigates back when the back button is clicked", () => {
    render(<Privacy />);

    const backButton = screen.getByRole("button", { name: /← Back/i });

    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
