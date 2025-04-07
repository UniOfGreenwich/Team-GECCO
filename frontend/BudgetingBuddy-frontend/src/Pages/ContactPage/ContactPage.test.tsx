import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Contact from './contact'; 
import '@testing-library/jest-dom/vitest';


const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual, 
    useNavigate: () => mockedNavigate, 
  };
});


describe('Contact Component', () => {
  beforeEach(() => {
   
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the Contact component correctly with all details', () => {
    
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    
    expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument();

    
    expect(screen.getByText(/We’d love to hear from you!/i)).toBeInTheDocument();

    
    expect(screen.getByText(/Email: support@budgetingbuddy.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: \(123\) 456-7890/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Address: 123 Finance Way, Suite 100/i)).toBeInTheDocument();

   
    expect(screen.getByText(/You can also leave us a message directly on our site./i)).toBeInTheDocument();

    
    const backButton = screen.getByRole('button', { name: /← Back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', () => {
   
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    
    const backButton = screen.getByRole('button', { name: /← Back/i });

    
    fireEvent.click(backButton);

    
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
