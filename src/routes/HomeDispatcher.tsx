import { useAuth } from '@/contexts/AuthContext';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage';
import { LandingPage } from '@/pages/LandingPage/LandingPage';

export const HomeDispatcher = () => {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  return <DashboardPage />;
};
