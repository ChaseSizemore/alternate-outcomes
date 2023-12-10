import _404Page from '@/app/(dashboard)/[...invalidPath]/page';
import { fireEvent, getByRole, getByTestId, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('404 page', () => {
  it('renders without crashing', () => {
    render(<_404Page />);
  });

  it("contains 'Page not found' text", () => {
    render(<_404Page />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it("contains 'Sorry, we couldn’t find the page you’re looking for.' text", () => {
    render(<_404Page />);
    expect(
      screen.getByText('Sorry, we couldn’t find the page you’re looking for.')
    ).toBeInTheDocument();
  });

it('contains a link to the home page and navigates correctly', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <BrowserRouter>
            <_404Page />
        </BrowserRouter>
    );
    const homeButton = getByText('Go back home');
    expect(homeButton).toBeInTheDocument();
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
});

});
