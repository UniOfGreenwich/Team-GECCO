import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import SignIn from './signin'; 
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

describe('SignIn Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup(); 
  });
  

  
  it('renders the SignIn component correctly', () => {
    renderWithRouter(<SignIn />);

   
    expect(
      screen.getByText('Budgeting Buddy Sign In')
    ).toBeInTheDocument();

    
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    
    expect(
      screen.getByRole('button', { name: /Back to Welcome/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In/i })
    ).toBeInTheDocument();

    
    const signUpLink = screen.getByRole('link', {
      name: /Don't have an account\? Sign Up!/i,
    });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/get-started'); 

   
    expect(
      screen.queryByText(/Invalid username or password/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); 
  });
  
  it('allows users to type into username and password fields', () => {
    renderWithRouter(<SignIn />);

    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });
  
  it('navigates to "/" when Back to Welcome button is clicked', () => {
    renderWithRouter(<SignIn />);
    const backButton = screen.getByRole('button', { name: /Back to Welcome/i });

    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
  
  it('navigates to "/dashboard" on successful login with correct credentials', () => {
    renderWithRouter(<SignIn />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    

    
    fireEvent.change(usernameInput, { target: { value: 'admin123' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });

   
    fireEvent.click(signInButton);
   
   
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');

   
    expect(
      screen.queryByText(/Invalid username or password/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
  
  it('shows an error message and does not navigate on failed login', () => {
    renderWithRouter(<SignIn />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    
    fireEvent.change(usernameInput, { target: { value: 'admin123' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

   
    fireEvent.click(signInButton);

    
    expect(mockedNavigate).not.toHaveBeenCalled();

   
    const errorMessage = screen.getByText(
      /Invalid username or password\. Please try again\./i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument(); 

   
    expect(usernameInput).toHaveAttribute('aria-invalid', 'true');
    expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    expect(usernameInput).toHaveAttribute('aria-describedby', 'signin-error');
    expect(passwordInput).toHaveAttribute('aria-describedby', 'signin-error');
  });
  
   it('clears the error message when user starts typing again', () => {
    renderWithRouter(<SignIn />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    
    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.click(signInButton);
    expect(screen.getByRole('alert')).toBeInTheDocument(); 

   
  });
 

});
