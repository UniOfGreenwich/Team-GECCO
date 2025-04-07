import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AboutUs from './aboutus';
import '@testing-library/jest-dom/vitest';
 
 
 
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));
 
describe('AboutUs Component', () => {
  beforeEach(() => {
 
    vi.clearAllMocks();
 
    cleanup();
  });
 
  it('renders the AboutUs component correctly', () => {
    render(<AboutUs />);
    
 
    expect(screen.getByText('About Us')).toBeInTheDocument();
    
 
    const backButton = screen.getByText('← Back');
    expect(backButton).toBeInTheDocument();
    
 
    expect(screen.getByText(/Welcome to BudgetingBuddy!/i)).toBeInTheDocument();
    expect(screen.getByText(/Our mission is to make budgeting simple/i)).toBeInTheDocument();
  });
 
  it('navigates back when back button is clicked', () => {
    render(<AboutUs />);
    
 
    const backButton = screen.getAllByText('← Back')[0];
    fireEvent.click(backButton);
    
 
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});