import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const useAuthMock = useAuth as Mock;

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  const logoutMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue({
        user: null,
        logout: logoutMock,
      });
    });

    it('should render the Login button', () => {
      renderHeader();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should not render the Bookshelves link', () => {
      renderHeader();
      expect(screen.queryByRole('link', { name: /bookshelves/i })).not.toBeInTheDocument();
    });

    it('should not render the user profile icon', () => {
        renderHeader();
        expect(screen.queryByText('T')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        logout: logoutMock,
      });
    });

    it('should render the Logout button', () => {
      renderHeader();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should render the Bookshelves link', () => {
      renderHeader();
      expect(screen.getByRole('link', { name: /bookshelves/i })).toBeInTheDocument();
    });

    it('should render the user profile icon with the first letter of their name', () => {
        renderHeader();
        const profileIcons = screen.getAllByText('T');
        expect(profileIcons[0]).toBeInTheDocument();
    });

    it('should call the logout function when the Logout button is clicked', () => {
      renderHeader();
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      fireEvent.click(logoutButton);
      expect(logoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
