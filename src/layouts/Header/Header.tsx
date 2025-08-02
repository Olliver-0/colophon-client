import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { LuBell } from 'react-icons/lu';
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from '@/components/forms/Button/Button';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-highlight sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl text-primary font-bold">
              Colophon
            </Link>

            <div className="hidden md:flex items-baseline space-x-4 ml-10">
              <Link
                to="/"
                className="text-sm text-detail hover:text-primary transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/books"
                className="text-sm text-detail hover:text-primary transition font-medium"
              >
                Search
              </Link>
              {isLoggedIn && (
                <Link
                  to="/bookshelves"
                  className="text-sm text-detail hover:text-primary transition font-medium"
                >
                  Bookshelves
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="#"
              className="flex text-detail hover:bg-highlight hover:text-primary rounded-md size-10 justify-center items-center transition"
            >
              <HiOutlineMagnifyingGlass />
            </Link>
            <Link
              to="#"
              className="flex text-detail hover:bg-highlight hover:text-primary rounded-md size-10 justify-center items-center transition"
            >
              <LuBell />
            </Link>
            {isLoggedIn && (
              <Link to="/profile">
                <div className="flex rounded-full h-8 w-8 items-center justify-center bg-primary text-white hover:scale-105 transition">
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              </Link>
            )}
            <Button
              className="bg-primary text-white w-16 h-10 ml-4 hover:bg-primary/80"
              onClick={isLoggedIn ? handleLogout : handleLogin}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              to="#"
              className="flex text-detail rounded-md size-10 justify-center items-center"
            >
              <HiOutlineMagnifyingGlass />
            </Link>
            <Link
              to="#"
              className="flex text-detail rounded-md size-10 justify-center items-center"
            >
              <LuBell />
            </Link>
            {isLoggedIn && (
              <Link to="/profile">
                <div className="flex rounded-full h-8 w-8 items-center justify-center bg-primary text-white">
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              </Link>
            )}
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </Button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out border-t border-highlight">
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="text-detail hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-detail hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            {isLoggedIn && (
              <Link
                to="/bookshelves"
                className="text-detail hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookshelves
              </Link>
            )}
            <div className="pt-4 mt-4 border-t border-highlight w-full flex flex-col items-center">
              <Button
                className="bg-primary text-white w-full py-2"
                onClick={isLoggedIn ? handleLogout : handleLogin}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
