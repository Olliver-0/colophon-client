import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('should render with the correct label and placeholder', () => {
    render(
      <Input
        label="Email Address"
        name="email"
        placeholder="Enter your email"
      />
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('should call the onChange handler when the user types', () => {
    const handleChange = vi.fn();

    render(
      <Input
        label="Email Address"
        name="email"
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByLabelText('Email Address');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
