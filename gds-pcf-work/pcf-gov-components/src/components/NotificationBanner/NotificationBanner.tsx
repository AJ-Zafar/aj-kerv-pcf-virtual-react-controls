import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { NotificationBannerProps } from './NotificationBanner.types';
import './NotificationBanner.css';

/**
 * Notification banner component for important messages at the top of a page.
 * Follows GOV.UK Design System notification banner pattern.
 * Uses role="region" by default, role="alert" for success banners.
 */
export const NotificationBanner: React.FC<NotificationBannerProps> = function NotificationBanner(props) {
  var heading = props.heading;
  var children = props.children;
  var type = props.type;
  var titleText = props.titleText || (type === 'success' ? 'Success' : 'Important');
  var titleHeadingLevel = props.titleHeadingLevel || 2;
  var titleId = props.titleId || 'govuk-notification-banner-title';
  var role = props.role || (type === 'success' ? 'alert' : 'region');
  var className = props.className;
  var id = props.id;

  var TitleTag = ('h' + titleHeadingLevel) as keyof JSX.IntrinsicElements;

  return (
    <div
      id={id}
      className={classNames(
        'govuk-notification-banner',
        type === 'success' && 'govuk-notification-banner--success',
        className
      )}
      role={role}
      aria-labelledby={titleId}
    >
      <div className="govuk-notification-banner__header">
        <TitleTag className="govuk-notification-banner__title" id={titleId}>
          {titleText}
        </TitleTag>
      </div>
      <div className="govuk-notification-banner__content">
        {children ? (
          children
        ) : heading ? (
          <p className="govuk-notification-banner__heading">{heading}</p>
        ) : null}
      </div>
    </div>
  );
};
