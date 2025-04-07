import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Selection from './selection'; 
import '@testing-library/jest-dom/vitest'; 


const mockedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), 
  useNavigate: () => mockedNavigate, 
}));

describe('Selection Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
 

  
  it('renders the Selection component correctly', () => {
    render(<Selection />);

    
    expect(
      screen.getByText('Please select your finance help plan')
    ).toBeInTheDocument();

    
    expect(screen.getByText('Car Finance')).toBeInTheDocument();
    expect(screen.getByText('Mortgage Plan')).toBeInTheDocument();
    expect(screen.getByText('Holiday')).toBeInTheDocument();
    expect(screen.getByText('Custom Savings')).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Continue/i })
    ).toBeInTheDocument();

    
    expect(
      screen.queryByText('Functionality is unavailable for this option.')
    ).not.toBeInTheDocument();
  });
  
  it('highlights the selected option and clears error on selection', () => {
    render(<Selection />);

    
    const carOption = screen.getByText('Car Finance').closest('.option-item');
    const mortgageOption = screen
      .getByText('Mortgage Plan')
      .closest('.option-item');
    const holidayOption = screen.getByText('Holiday').closest('.option-item');
    const continueButton = screen.getByRole('button', { name: /Continue/i });

    
    expect(carOption).not.toHaveClass('selected');
    expect(mortgageOption).not.toHaveClass('selected');

   
    fireEvent.click(holidayOption!); 
    fireEvent.click(continueButton);
    expect(
      screen.getByText('Functionality is unavailable for this option.')
    ).toBeInTheDocument();

    
    fireEvent.click(carOption!); 

    
    expect(carOption).toHaveClass('selected');
    
    expect(mortgageOption).not.toHaveClass('selected');
    
    expect(
      screen.queryByText('Functionality is unavailable for this option.')
    ).not.toBeInTheDocument();

   
    fireEvent.click(mortgageOption!);

    
    expect(mortgageOption).toHaveClass('selected');
   
    expect(carOption).not.toHaveClass('selected');
  });
  
  it('navigates to the welcome page ("/") when Back button is clicked', () => {
    render(<Selection />);
    const backButton = screen.getByRole('button', { name: /Back/i });

    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
 
  it('navigates to "/car" when "Car Finance" is selected and Continue is clicked', () => {
    render(<Selection />);
    const carOption = screen.getByText('Car Finance').closest('.option-item');
    const continueButton = screen.getByRole('button', { name: /Continue/i });

    
    fireEvent.click(carOption!);

   
    fireEvent.click(continueButton);

    
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/car');
    
    expect(
      screen.queryByText('Functionality is unavailable for this option.')
    ).not.toBeInTheDocument();
  });
 
  it('navigates to "/mortgage" when "Mortgage Plan" is selected and Continue is clicked', () => {
    render(<Selection />);
    const mortgageOption = screen
      .getByText('Mortgage Plan')
      .closest('.option-item');
    const continueButton = screen.getByRole('button', { name: /Continue/i });

    
    fireEvent.click(mortgageOption!);

    
    fireEvent.click(continueButton);

   
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/mortgage');
    
    expect(
      screen.queryByText('Functionality is unavailable for this option.')
    ).not.toBeInTheDocument();
  });
  
  it('shows an error message and does not navigate when an unavailable option is selected and Continue is clicked', () => {
    render(<Selection />);
    const holidayOption = screen.getByText('Holiday').closest('.option-item');
    const continueButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.click(holidayOption!);

    
    fireEvent.click(continueButton);

    
    expect(mockedNavigate).not.toHaveBeenCalled();

    
    expect(
      screen.getByText('Functionality is unavailable for this option.')
    ).toBeInTheDocument();
  });
  
  it('shows an error message and does not navigate when Continue is clicked with no option selected', () => {
    render(<Selection />);
    const continueButton = screen.getByRole('button', { name: /Continue/i });

    
    fireEvent.click(continueButton);

   
    expect(mockedNavigate).not.toHaveBeenCalled();

   
    expect(
      screen.getByText('Functionality is unavailable for this option.')
    ).toBeInTheDocument();
  });
  
});
