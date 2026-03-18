import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { HintProps } from './Hint.types';
import './Hint.css';

/**
 * Hint component for providing additional guidance on form inputs
 * Follows GOV.UK Design System hint pattern
 */
export const Hint: React.FC<HintProps> = ({
  children,
  id,
  className,
}) => {
  const classes = classNames('govuk-hint', className);

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
};
