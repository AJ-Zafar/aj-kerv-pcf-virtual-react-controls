import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { SelectProps } from './Select.types';
import './Select.css';

/**
 * Select component for dropdown selection
 * Follows GOV.UK Design System select pattern
 */
export const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  children,
  disabled,
  error,
  describedBy,
  className,
}) => {
  const classes = classNames(
    'govuk-select',
    error && 'govuk-select--error',
    className
  );

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classes}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy || undefined}
    >
      {children}
    </select>
  );
};
