import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders the welcome heading', () => {
    render(<HomePage />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Welcome');
  });

  it('renders the subheading', () => {
    render(<HomePage />);
    const subheadingElement = screen.getByText(
      /A simple to-do app to get things done./i
    );
    expect(subheadingElement).toBeInTheDocument();
  });

  it('renders the register button', () => {
    render(<HomePage />);
    const registerButton = screen.getByRole('button', {
      name: /register/i
    });
    expect(registerButton).toBeInTheDocument();
  });

  it('renders the login button', () => {
    render(<HomePage />);
    const loginButton = screen.getByRole('button', {
      name: /login/i
    });
    expect(loginButton).toBeInTheDocument();
  });

  it('has neon orange theme instead of purple', () => {
    render(<HomePage />);
    const homePageContainer = screen.getByTestId('home-page-container');
    
    // Check that the container does not have purple theme classes
    expect(homePageContainer).not.toHaveClass('purple-theme');
    expect(homePageContainer).not.toHaveClass('bg-purple-500');
    expect(homePageContainer).not.toHaveClass('text-purple-600');
    
    // Check that the container has neon orange theme classes
    expect(homePageContainer).toHaveClass('neon-orange-theme');
    expect(homePageContainer).toHaveClass('bg-neon-orange-500');
    expect(homePageContainer).toHaveClass('text-neon-orange-600');
  });
});