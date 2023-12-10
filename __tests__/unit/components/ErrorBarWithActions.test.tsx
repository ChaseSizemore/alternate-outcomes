import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBarWithActions from '@/app/components/ErrorBarWithActions';
import { goToContributePage, goToHomePage } from '@/app/utils/windowRelocation';

jest.mock('../../../utils/windowRelocation', () => ({
  goToContributePage: jest.fn(),
  goToHomePage: jest.fn(),
}));

describe('ErrorBarWithActions', () => {
  test('renders error message', () => {
    render(<ErrorBarWithActions />);
    const errorMessage = screen.getByText(
      /Theres no descirption on this bootcamp!/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders "Add a submission" button', () => {
    render(<ErrorBarWithActions />);
    const addButton = screen.getByText(/Add a submission/i);
    expect(addButton).toBeInTheDocument();
  });

  test('renders "Go Back" button', () => {
    render(<ErrorBarWithActions />);
    const goBackButton = screen.getByText(/Go Back/i);
    expect(goBackButton).toBeInTheDocument();
  });

  test('redirects to "/contribute" when "Add a submission" button is clicked', () => {
    render(<ErrorBarWithActions />);
    const addButton = screen.getByText(/Add a submission/i);
    fireEvent.click(addButton);
    expect(goToContributePage).toHaveBeenCalled();
  });

  test('redirects to "/" when "Go Back" button is clicked', () => {
    render(<ErrorBarWithActions />);
    const goBackButton = screen.getByText(/Go Back/i);
    fireEvent.click(goBackButton);
    expect(goToHomePage).toHaveBeenCalled();
  });
});
