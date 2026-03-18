import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TextareaProps } from './Textarea.types';
import './Textarea.css';

/**
 * Textarea component for multi-line text entry
 * Follows GOV.UK Design System textarea pattern
 */
export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  disabled,
  error,
  describedBy,
  rows = 5,
  className,
}) => {
  const classes = classNames(
    'govuk-textarea',
    error && 'govuk-textarea--error',
    className
  );

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      className={classes}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy || undefined}
    />
  );
};
