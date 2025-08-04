import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { Input } from '@/components/forms/Input/Input';
import { Link } from 'react-router-dom';
import { Button } from '@/components/forms/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
}

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords does not match');
      return;
    }

    const formData = { name, email, password };
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorData = error.response.data as ApiErrorResponse;
        console.error('API error:', errorData.message);
        alert(errorData.message);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error ocurred. Try again.');
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-4 py-8 gap-4">
        <h1 className="font-bold text-center text-3xl text-detail">
          Sign Up and become a <span className="text-primary">Colophon</span>{' '}
          Reader!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-96 bg-white mt-4 p-6 rounded-xl border border-highlight"
        >
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Insert your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Insert your email here"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Insert your password here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Insert your password here"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primary w-32 self-center text-white hover:bg-primary/80"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-detail text-base text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 font-semibold text-lg transition"
          >
            Sign in!
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};
