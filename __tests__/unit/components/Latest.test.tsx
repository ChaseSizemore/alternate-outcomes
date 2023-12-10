import { render, screen } from '@testing-library/react';
import Latest from '@/components/Latest';

describe('Latest Component', () => {
  it('renders without crashing', () => {
    render(<Latest latest={{}} />);
    expect(screen.getByText('Bootcamp')).toBeInTheDocument();
  });
  it('renders InfoItem components with provided data', () => {
    const latestData = {
      bootcamp: 'React 101',
      company: 'Tech Corp',
      position: 'Developer',
      salary: '50000',
    };

    const { getByText } = render(<Latest latest={latestData} />);

    expect(getByText('Bootcamp')).toBeInTheDocument();
    expect(getByText('React 101')).toBeInTheDocument();
    expect(getByText('Company')).toBeInTheDocument();
    expect(getByText('Tech Corp')).toBeInTheDocument();
    expect(getByText('Position')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
    expect(getByText('$50,000')).toBeInTheDocument();
  });

  it('handles missing salary gracefully', () => {
    const latestData = {
      bootcamp: 'React 101',
      company: 'Tech Corp',
      position: 'Developer',
      salary: null,
    };

    const { getByText, queryByText } = render(<Latest latest={latestData} />);

    expect(getByText('Bootcamp')).toBeInTheDocument();
    expect(getByText('React 101')).toBeInTheDocument();
    expect(queryByText('$')).not.toBeInTheDocument(); // Checks that no salary is displayed
  });

  it('handles missing data gracefully', () => {
    const latestData = {
      bootcamp: null,
      company: null,
      position: null,
      salary: null,
    };

    const { getByText, queryByText } = render(<Latest latest={latestData} />);

    expect(getByText('Bootcamp')).toBeInTheDocument();
    expect(queryByText('React 101')).not.toBeInTheDocument(); // Checks that no bootcamp is displayed
    expect(getByText('Company')).toBeInTheDocument();
    expect(queryByText('Tech Corp')).not.toBeInTheDocument(); // Checks that no company is displayed
    expect(getByText('Position')).toBeInTheDocument();
    expect(queryByText('Developer')).not.toBeInTheDocument(); // Checks that no position is displayed
    expect(queryByText('$')).not.toBeInTheDocument(); // Checks that no salary is displayed
  });
});
