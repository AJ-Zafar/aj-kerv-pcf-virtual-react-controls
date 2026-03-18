import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { SummaryListProps } from './SummaryList.types';
import './SummaryList.css';

/**
 * Summary list component for displaying key-value pairs
 * Follows GOV.UK Design System summary list pattern
 */
export const SummaryList: React.FC<SummaryListProps> = ({
  rows,
  noBorder,
  className,
}) => {
  const summaryListClasses = classNames(
    'govuk-summary-list',
    noBorder && 'govuk-summary-list--no-border',
    className
  );

  return (
    <dl className={summaryListClasses}>
        {rows.map((row) => (
          <div
            key={row.key}
            className={classNames(
              'govuk-summary-list__row',
              !row.actions && 'govuk-summary-list__row--no-actions',
              row.noBorder && 'govuk-summary-list__row--no-border'
            )}
          >
          <dt className="govuk-summary-list__key">{row.key}</dt>
          <dd className="govuk-summary-list__value">{row.value}</dd>
          {row.actions && (
            <dd className="govuk-summary-list__actions">{row.actions}</dd>
          )}
        </div>
      ))}
    </dl>
  );
};
