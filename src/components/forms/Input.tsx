import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

export const Input = ({ label, name, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name} className="text-base text-detail font-semibold mb-0.5">
        {label}
      </label>
      <input id={name} name={name} {...rest} className="border border-primary text-detail placeholder:text-highlight rounded-md h-10 p-2 outline-none focus:border-2" />
    </div>
  );
};
