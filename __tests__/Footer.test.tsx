import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the GitHub icon link', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', '#');
  });

  it('renders the correct copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/2023 Bootcamp Outcomes. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });
});