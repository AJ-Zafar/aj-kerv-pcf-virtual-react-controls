import * as React from 'react';

export interface NotificationBannerProps {
  /**
   * The heading text displayed in the banner content area.
   * For simple single-line banners.
   */
  heading?: React.ReactNode;

  /**
   * Rich content for the banner body. When provided, takes priority over heading.
   */
  children?: React.ReactNode;

  /**
   * Text shown in the coloured header bar.
   * @default 'Important' for standard, 'Success' for success type
   */
  titleText?: string;

  /**
   * Heading level for the title element.
   * @default 2
   */
  titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Unique id for the title element, used for aria-labelledby.
   * @default 'govuk-notification-banner-title'
   */
  titleId?: string;

  /**
   * Banner type — 'success' adds green styling and role="alert".
   */
  type?: 'success';

  /**
   * Override the ARIA role.
   * @default 'region' for standard, 'alert' for success
   */
  role?: string;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;
}
