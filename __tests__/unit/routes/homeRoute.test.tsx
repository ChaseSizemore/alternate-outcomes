import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { useLatest } from '@/hooks/getLatest';

// Mock the useLatest hook
jest.mock('@/hooks/getLatest', () => ({
  useLatest: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    // Provide mock data for useLatest
    useLatest.mockReturnValue({
      title: "Mock Latest Title",
      description: "Mock Description"
    });
  });

  it('renders the Home component correctly', () => {
    render(<Home />);
    expect(screen.getByText('Alternate Outcomes made simple for future Software Engineers.')).toBeInTheDocument();
    expect(screen.getByText('Outcomes')).toBeInTheDocument();
    expect(screen.getByText('Contribute')).toBeInTheDocument();
    expect(screen.getByText('Latest Outcome!')).toBeInTheDocument();
  });

  it('renders the alert message', () => {
    render(<Home />);
    const alertMessage = "This site is not affiliated with any bootcamps listed. All data is user submitted. Please do your own research before enrolling or applying in a bootcamp.";
    expect(screen.getByText(alertMessage)).toBeInTheDocument();
  });

  it('renders the Latest component with correct data', () => {
    render(<Home />);
    expect(screen.getByText('Mock Latest Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
  });

  it('displays the correct heading and subheading', () => {
    render(<Home />);
    expect(screen.getByText('Alternate Outcomes made simple for future Software Engineers.')).toBeInTheDocument();
    expect(screen.getByText(/Bootcamps and self teaching can be a great choice/)).toBeInTheDocument();
  });

  it('renders the buttons with correct text and href', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Outcomes' })).toHaveAttribute('href', '/outcomes');
    expect(screen.getByRole('link', { name: 'Contribute' })).toHaveAttribute('href', '/contribute');
  });

});
