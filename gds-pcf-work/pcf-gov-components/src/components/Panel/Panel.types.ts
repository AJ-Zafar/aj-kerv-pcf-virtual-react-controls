import * as React from 'react';

export interface PanelProps {
  /**
   * Large heading text shown in the panel (e.g. "Application complete").
   */
  title: React.ReactNode;

  /**
   * Optional body content beneath the title (e.g. reference number).
   */
  children?: React.ReactNode;

  /**
   * Heading level for the title element.
   * @default 1
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;
}
