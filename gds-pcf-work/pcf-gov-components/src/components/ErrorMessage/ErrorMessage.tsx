import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { ErrorMessageProps } from './ErrorMessage.types';
import './ErrorMessage.css';

/**
 * Error message component for displaying validation errors
 * Follows GOV.UK Design System error message pattern
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  id,
  className,
  visuallyHiddenText = 'Error',
}) => {
  const classes = classNames('govuk-error-message', className);

  return (
    <p id={id} className={classes}>
      {visuallyHiddenText && (
        <>
          <span className="govuk-visually-hidden">{visuallyHiddenText}:</span>{' '}
        </>
      )}
      {children}
    </p>
  );
};
