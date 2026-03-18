import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { LabelProps } from './Label.types';
import './Label.css';

/**
 * Label component for form inputs
 * Follows GOV.UK Design System label pattern
 */
export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
}) => {
  const classes = classNames('govuk-label', className);

  return (
    <label className={classes} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
