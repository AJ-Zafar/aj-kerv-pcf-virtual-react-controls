import React from 'react';
import { classNames } from '@/utils/classNames';

interface Props {
  legend: string;
  legendSize?: 's' | 'm' | 'l' | 'xl';
  isPageHeading?: boolean;
  describedBy?: string;
  children: React.ReactNode;
  className?: string;
}

export function GovFieldset({
  legend,
  legendSize = 'l',
  isPageHeading = false,
  describedBy,
  children,
  className,
}: Props) {
  const legendContent = isPageHeading ? (
    <h1 className="govuk-fieldset__heading">{legend}</h1>
  ) : (
    legend
  );

  return (
    <fieldset
      className={classNames('govuk-fieldset', className)}
      aria-describedby={describedBy || undefined}
    >
      <legend
        className={classNames(
          'govuk-fieldset__legend',
          `govuk-fieldset__legend--${legendSize}`
        )}
      >
        {legendContent}
      </legend>
      {children}
    </fieldset>
  );
}
