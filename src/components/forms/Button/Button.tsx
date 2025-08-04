import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ComponentProps<'button'> & {
  className?: string;
};

export const Button = ({
  children,
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  const defaultStyles =
    'flex justify-center items-center h-10 px-2 py-4 rounded-md text-sm font-semibold cursor-pointer transition';

  return (
    <button type={type} className={cn(defaultStyles, className)} {...rest}>
      {children}
    </button>
  );
};
