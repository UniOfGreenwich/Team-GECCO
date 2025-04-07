import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import WelcomeComponent from './welcome'; 
import '@testing-library/jest-dom/vitest'; 




const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object), 
    useNavigate: () => mockedNavigate, 
  };
});


const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('WelcomeComponent', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  
  it('renders the WelcomeComponent correctly with all elements', () => {
    renderWithRouter(<WelcomeComponent />);

    
    const logo = screen.getByAltText('BudgetingBuddy Logo');
    expect(logo).toBeInTheDocument();
    
    expect(
      screen.getByRole('heading', { level: 1, name: /Welcome to BudgetingBuddy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Manage your finances with ease')
    ).toBeInTheDocument();

    
    expect(
      screen.getByRole('button', { name: /Start Your New Journey/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In To View Existing/i })
    ).toBeInTheDocument();


    const aboutLink = screen.getByRole('link', { name: /About Us/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    const contactLink = screen.getByRole('link', { name: /Contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');

    const helpLink = screen.getByRole('link', { name: /Help/i });
    expect(helpLink).toBeInTheDocument();
    expect(helpLink).toHaveAttribute('href', '/help');

    const privacyLink = screen.getByRole('link', { name: /Privacy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
  
  it('navigates to "/get-started" when "Start Your New Journey" button is clicked', () => {
    renderWithRouter(<WelcomeComponent />);
    const startButton = screen.getByRole('button', {
      name: /Start Your New Journey/i,
    });

    fireEvent.click(startButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/get-started');
  });
  
  it('navigates to "/signin" when "Sign In To View Existing" button is clicked', () => {
    renderWithRouter(<WelcomeComponent />);
    const signInButton = screen.getByRole('button', {
      name: /Sign In To View Existing/i,
    });

    fireEvent.click(signInButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/signin');
  });
  
});
