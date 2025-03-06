import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the intersection observer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock the context
vi.mock('../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Tobias Bordenca/i)).toBeInTheDocument();
  });

  it('displays the navigation menu', () => {
    render(<App />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByText(/Tobias Bordenca/i)).toBeInTheDocument();
    expect(screen.getByText(/View Experience/i)).toBeInTheDocument();
  });
});
