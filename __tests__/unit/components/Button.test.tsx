import { render, screen } from '@testing-library/react';
import { Button } from '@/app/components/Button';

describe('Button', () => {
  test('renders button with default variant and color', () => {
    render(<Button>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2'
    );
    expect(buttonElement).toHaveClass(
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900'
    );
  });

  test('renders button with custom variant and color', () => {
    render(
      <Button variant="outline" color="white">
        Hello
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none'
    );
    expect(buttonElement).toHaveClass(
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white'
    );
  });

  test('renders link with default variant and color', () => {
    render(<Button href="/">Hello</Button>);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass(
      'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2'
    );
    expect(linkElement).toHaveClass(
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900'
    );
  });
});
