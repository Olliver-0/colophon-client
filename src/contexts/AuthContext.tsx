import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from 'react';

import {
  login as loginService,
  register as registerService,
  getProfile,
  logout as logoutService,
} from '@/services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
}
interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  name?: string | null;
  email: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userProfile = await getProfile();
        setUser(userProfile);
      } catch (error) {
        console.error('No active session found.', error);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSuccessfulAuth = async () => {
    try {
      const userProfile = await getProfile();
      setUser(userProfile);
    } catch (error) {
      console.error('Failed to fetch user profile after auth', error);
      setUser(null);
    }
  };

  const register = async (userData: RegisterData) => {
    await registerService(userData);
    await login({ email: userData.email, password: userData.password });
  };

  const login = async (credentials: LoginData) => {
    await loginService(credentials);
    await handleSuccessfulAuth();
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout API call failed', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
