import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from '@/pages/SignUpPage/SignUpPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
};
