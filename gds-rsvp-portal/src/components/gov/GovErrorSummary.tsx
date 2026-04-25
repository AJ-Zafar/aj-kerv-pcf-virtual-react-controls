import React from 'react';

interface ErrorItem {
  field: string;
  message: string;
}

interface Props {
  title?: string;
  errors: ErrorItem[];
}

export function GovErrorSummary({
  title = 'There is a problem',
  errors,
}: Props) {
  if (errors.length === 0) return null;

  return (
    <div
      className="govuk-error-summary"
      data-module="govuk-error-summary"
      role="alert"
      aria-labelledby="error-summary-title"
      tabIndex={-1}
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        {title}
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {errors.map((err) => (
            <li key={err.field}>
              <a href={`#${err.field}`}>{err.message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
