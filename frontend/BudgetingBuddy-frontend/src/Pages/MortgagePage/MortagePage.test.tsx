import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Mortgage from './mortgage';
import '@testing-library/jest-dom/vitest';

// --- Mock react-router-dom ---
// Mock useNavigate exactly like in the previous examples
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual, // Keep other exports like MemoryRouter
    useNavigate: () => mockedNavigate, // Override useNavigate
  };
});
// --- End Mocking ---

describe('Mortgage Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
     // Clean up the DOM after each test
     cleanup();
  });

  it('renders the Mortgage component correctly', () => {
    // Render the component wrapped in MemoryRouter
    render(
      <MemoryRouter>
        <Mortgage />
      </MemoryRouter>
    );

    // Check if the main heading is rendered
    expect(screen.getByRole('heading', { name: /Mortgage Plan Page/i })).toBeInTheDocument();

    // Check if the placeholder text is rendered
    expect(screen.getByText('This is a basic placeholder for Mortgage Plan functionality.')).toBeInTheDocument();

    // Check if the back button is rendered
    const backButton = screen.getByRole('button', { name: /← Back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('navigates to /selection when the back button is clicked', () => {
    // Render the component
    render(
      <MemoryRouter>
        <Mortgage />
      </MemoryRouter>
    );

    // Find the back button
    const backButton = screen.getByRole('button', { name: /← Back/i });

    // Simulate a user clicking the button
    fireEvent.click(backButton);

    // Assert that the mocked navigate function was called
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    // Assert that it was called with the correct path '/selection'
    expect(mockedNavigate).toHaveBeenCalledWith('/selection');
  });
});
