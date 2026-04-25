import React from 'react';
import { classNames } from '@/utils/classNames';

interface Props {
  type?: 'success' | 'info';
  title: string;
  children: React.ReactNode;
}

export function GovNotificationBanner({ type, title, children }: Props) {
  return (
    <div
      className={classNames(
        'govuk-notification-banner',
        type === 'success' && 'govuk-notification-banner--success'
      )}
      role={type === 'success' ? 'alert' : 'region'}
      aria-labelledby="notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="notification-banner-title"
        >
          {title}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">{children}</div>
    </div>
  );
}
