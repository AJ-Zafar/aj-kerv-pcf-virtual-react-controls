import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { ButtonProps } from './Button.types';
import './Button.css';

/**
 * Button component for form actions
 * Follows GOV.UK Design System button pattern
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'submit',
  disabled,
  fullWidth,
  onClick,
  className,
  variant,
}) => {
  const classes = classNames(
    'govuk-button',
    variant === 'secondary' && 'govuk-button--secondary',
    variant === 'warning' && 'govuk-button--warning',
    variant === 'inverse' && 'govuk-button--inverse',
    variant === 'start' && 'govuk-button--start',
    fullWidth && 'govuk-button--full-width',
    className
  );

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      aria-disabled={disabled ? 'true' : undefined}
    >
      {children}
    </button>
  );
};
