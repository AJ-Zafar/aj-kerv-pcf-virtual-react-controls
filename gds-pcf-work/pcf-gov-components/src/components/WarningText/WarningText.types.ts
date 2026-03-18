import * as React from 'react';

export interface WarningTextProps {
  /**
   * Warning message content.
   */
  children: React.ReactNode;

  /**
   * Visually hidden assistive text for the icon.
   * Announced by screen readers before the warning.
   * @default 'Warning'
   */
  iconFallbackText?: string;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;
}
