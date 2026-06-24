import React from 'react';
import { Link } from 'react-router-dom';

interface Row {
  key: string;
  value: React.ReactNode;
  action?: { href: string; label: string };
}

interface Props {
  rows: Row[];
}

export function GovSummaryList({ rows }: Props) {
  return (
    <dl className="govuk-summary-list">
      {rows.map((row) => (
        <div key={row.key} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{row.key}</dt>
          <dd className="govuk-summary-list__value">{row.value}</dd>
          {row.action && (
            <dd className="govuk-summary-list__actions">
              <Link className="govuk-link" to={row.action.href}>
                {row.action.label}
                <span className="govuk-visually-hidden"> {row.key}</span>
              </Link>
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
