import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { LandingPage } from '../LandingPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const useAuthMock = useAuth as Mock;

describe('LandingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({
      user: null,
    });
  });

  it('should render the main heading and key sections', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: /organize your personal library/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByAltText('Illuminated Bookshelves')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /why choose colophon\?/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Advanced Searching')).toBeInTheDocument();
  });
});
