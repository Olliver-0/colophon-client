import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('should render its children correctly', () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} disabled>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
