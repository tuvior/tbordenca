import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

vi.mock('react-responsive-masonry', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="masonry">{children}</div>
  ),
  ResponsiveMasonry: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-masonry">{children}</div>
  ),
}));

// Mock the context
vi.mock('../context/ThemeContextBase', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tobias Bordenca/i)).toBeInTheDocument();
  });

  it('displays the navigation menu', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Resume$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Projects$/i })).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tobias Bordenca/i)).toBeInTheDocument();
    expect(screen.getByText(/View Resume/i)).toBeInTheDocument();
  });
});
