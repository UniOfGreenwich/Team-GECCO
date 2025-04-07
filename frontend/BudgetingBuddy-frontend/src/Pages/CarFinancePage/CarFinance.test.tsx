
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Car from './car';
import '@testing-library/jest-dom/vitest';


const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual, 
    useNavigate: () => mockedNavigate, 
  };
});


describe('Car Component', () => {
  beforeEach(() => {
    
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the Car component correctly', () => {
    
    render(
      <MemoryRouter>
        <Car />
      </MemoryRouter>
    );

    
    expect(screen.getByRole('heading', { name: /Car Finance Page/i })).toBeInTheDocument();

    expect(screen.getByText('This is a basic placeholder for Car Finance functionality.')).toBeInTheDocument();

  
    const backButton = screen.getByRole('button', { name: /← Back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('navigates to /selection when the back button is clicked', () => {
    
    render(
      <MemoryRouter>
        <Car />
      </MemoryRouter>
    );

    
    const backButton = screen.getByRole('button', { name: /← Back/i });

   
    fireEvent.click(backButton);

    
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    
    expect(mockedNavigate).toHaveBeenCalledWith('/selection');
  });
});
