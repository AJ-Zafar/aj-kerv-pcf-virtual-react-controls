import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { ErrorSummaryProps } from './ErrorSummary.types';
import './ErrorSummary.css';

/**
 * Error summary component displayed at the top of a page
 * to list all validation errors with links to the relevant fields.
 * Follows GOV.UK Design System error summary pattern.
 */
export const ErrorSummary: React.FC<ErrorSummaryProps> = ({
  heading = 'There is a problem',
  description,
  errors,
  onErrorClick,
  className,
}) => {
  const handleClick = (
    e: React.MouseEvent,
    targetId: string
  ): void => {
    e.preventDefault();
    if (onErrorClick) {
      onErrorClick(targetId);
    }
  };

  return (
    <div
      className={classNames('govuk-error-summary', className)}
      role="alert"
      aria-labelledby="error-summary-title"
      tabIndex={-1}
    >
      <h2
        className="govuk-error-summary__title"
        id="error-summary-title"
      >
        {heading}
      </h2>
      <div className="govuk-error-summary__body">
        {description && <p>{description}</p>}
        {errors.length > 0 && (
          <ul className="govuk-error-summary__list">
            {errors.map(function (error) {
              return (
                <li key={error.targetId}>
                  {onErrorClick ? (
                    <button
                      type="button"
                      onClick={function (e) {
                        handleClick(e, error.targetId);
                      }}
                    >
                      {error.text}
                    </button>
                  ) : (
                    <a href={'#' + error.targetId}>
                      {error.text}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
