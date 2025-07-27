import React from 'react';

type ButtonProps = React.ComponentProps<'button'>;

export const Button = ({ children, type = 'button', ...rest }: ButtonProps) => {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
};