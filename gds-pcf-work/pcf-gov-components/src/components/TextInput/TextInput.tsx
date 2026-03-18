import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TextInputProps } from './TextInput.types';
import './TextInput.css';

/**
 * Text input component for form text entry
 * Follows GOV.UK Design System text input pattern
 */
export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  onChange,
  type = 'text',
  disabled,
  error,
  describedBy,
  width,
  autoComplete,
  className,
}) => {
  const classes = classNames(
    'govuk-input',
    error && 'govuk-input--error',
    width && `govuk-input--width-${width}`,
    className
  );

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
      className={classes}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy || undefined}
    />
  );
};
