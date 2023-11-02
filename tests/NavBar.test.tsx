/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('should render the navbar', () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  it('should render the home link', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the outcomes link', () => {
    render(<Navbar />);
    const outcomesLink = screen.getByRole('link', { name: /outcomes/i });
    expect(outcomesLink).toBeInTheDocument();
    expect(outcomesLink).toHaveAttribute('href', '/outcomes');
  });

  it('should render the bootcamp directory link', () => {
    render(<Navbar />);
    const bootcampLink = screen.getByRole('link', {
      name: /bootcamp directory/i,
    });
    expect(bootcampLink).toBeInTheDocument();
    expect(bootcampLink).toHaveAttribute('href', '/bootcamps');
  });

  it('should render the contribute button', () => {
    render(<Navbar />);
    const contributeButton = screen.getByRole('link', { name: /contribute!/i });
    expect(contributeButton).toBeInTheDocument();
    expect(contributeButton).toHaveAttribute('href', '/contribute');
  });
});
