import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button type={type} className="button" {...props}>
      {children}
    </button>
  );
};