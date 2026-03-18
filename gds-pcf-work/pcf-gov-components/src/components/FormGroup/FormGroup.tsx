import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { FormGroupProps } from './FormGroup.types';
import './FormGroup.css';

/**
 * Form group component for wrapping form controls
 * Follows GOV.UK Design System form group pattern
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  error,
  className,
}) => {
  const classes = classNames(
    'govuk-form-group',
    error && 'govuk-form-group--error',
    className
  );

  return <div className={classes}>{children}</div>;
};
