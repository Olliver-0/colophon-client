import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '../ProtectedRoute';
import { PublicRoute } from '../PublicRoute';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const useAuthMock = useAuth as Mock;

const LoginPage = () => <h1>Login Page</h1>;
const ProfilePage = () => <h1>Profile Page</h1>;
const HomePage = () => <h1>Home Page</h1>;

const renderRoutes = (initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ProtectedRoute', () => {
    it('should redirect to /login if user is not authenticated', async () => {
      useAuthMock.mockReturnValue({ user: null });

      renderRoutes('/profile');

      await waitFor(() => {
        expect(screen.queryByText('Profile Page')).not.toBeInTheDocument();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
      });
    });

    it('should allow access if user is authenticated', () => {
      useAuthMock.mockReturnValue({ user: { id: '1' } });

      renderRoutes('/profile');

      expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });
  });

  describe('PublicRoute', () => {
    it('should allow access if user is not authenticated', () => {
      useAuthMock.mockReturnValue({ user: null });

      renderRoutes('/login');

      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('should redirect to / if user is authenticated', async () => {
      useAuthMock.mockReturnValue({ user: { id: '1' } });

      renderRoutes('/login');

      await waitFor(() => {
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
        expect(screen.getByText('Home Page')).toBeInTheDocument();
      });
    });
  });
});
