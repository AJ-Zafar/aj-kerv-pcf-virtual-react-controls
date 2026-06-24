import React, { useId } from 'react';
import { classNames } from '@/utils/classNames';

interface Props {
  type?: 'success' | 'info';
  title: string;
  children: React.ReactNode;
}

export function GovNotificationBanner({ type, title, children }: Props) {
  const uniqueId = useId();
  const titleId = `notification-banner-title-${uniqueId}`;

  return (
    <div
      className={classNames(
        'govuk-notification-banner',
        type === 'success' && 'govuk-notification-banner--success'
      )}
      role={type === 'success' ? 'alert' : 'region'}
      aria-labelledby={titleId}
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id={titleId}>
          {title}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">{children}</div>
    </div>
  );
}
