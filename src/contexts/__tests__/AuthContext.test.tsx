import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext';
import * as authService from '@/services/auth.service';

vi.mock('@/services/auth.service');

const mockedAuthService = authService as {
  login: Mock;
  register: Mock;
  getProfile: Mock;
  logout: Mock;
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should initially have no user', async () => {
    mockedAuthService.getProfile.mockRejectedValue(new Error('No active session'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });
  });

  it('should set user on successful login', async () => {
    mockedAuthService.getProfile
      .mockRejectedValueOnce(new Error('No active session'))
      .mockResolvedValueOnce(mockUser);

    mockedAuthService.login.mockResolvedValue({});

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.user).toBeNull());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(mockedAuthService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(mockedAuthService.getProfile).toHaveBeenCalledTimes(2);
});

  it('should call register and then login the user', async () => {
    mockedAuthService.register.mockResolvedValue({});
    mockedAuthService.login.mockResolvedValue({});
    mockedAuthService.getProfile.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register({ name: 'Test User', email: 'test@example.com', password: 'password' });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(mockedAuthService.register).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'password' });
    expect(mockedAuthService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
  });

  it('should clear user on logout', async () => {
    mockedAuthService.getProfile.mockResolvedValue(mockUser);
    mockedAuthService.logout.mockResolvedValue({});

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
    });

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(mockedAuthService.logout).toHaveBeenCalledTimes(1);
  });
});
