import * as React from 'react';

export interface DetailsProps {
  /**
   * Summary text (the clickable label)
   */
  summary: string;

  /**
   * Content revealed when expanded
   */
  children: React.ReactNode;

  /**
   * Whether the details element is initially open
   * @default false
   */
  open?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
