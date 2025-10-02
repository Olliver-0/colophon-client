import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should render footer sections and social media icons', () => {
    render(<Footer />);

    expect(screen.getByText('Colophon')).toBeInTheDocument();

    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Social Medias')).toBeInTheDocument();

    expect(
      screen.getByText(/© 2025 colophon\. all rights reserved\./i)
    ).toBeInTheDocument();
  });
});