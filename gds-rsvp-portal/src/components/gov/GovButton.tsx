import React from 'react';
import { classNames } from '@/utils/classNames';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'secondary' | 'warning' | 'start';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function GovButton({
  children,
  type = 'submit',
  variant,
  disabled,
  onClick,
  className,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      className={classNames(
        'govuk-button',
        variant === 'secondary' && 'govuk-button--secondary',
        variant === 'warning' && 'govuk-button--warning',
        variant === 'start' && 'govuk-button--start',
        className
      )}
      data-module="govuk-button"
      data-prevent-double-click="true"
      onClick={onClick}
    >
      {children}
      {variant === 'start' && (
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      )}
    </button>
  );
}
