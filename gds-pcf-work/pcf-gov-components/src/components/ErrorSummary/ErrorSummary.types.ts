import * as React from 'react';

export interface ErrorSummaryItem {
  /**
   * Unique identifier for the target form field (used for href="#id" and onClick)
   */
  targetId: string;

  /**
   * Error message text to display
   */
  text: string;
}

export interface ErrorSummaryProps {
  /**
   * Heading text displayed at the top of the error summary
   * @default 'There is a problem'
   */
  heading?: string;

  /**
   * Optional description paragraph shown below the heading
   */
  description?: string;

  /**
   * Array of error items to display as a linked list
   */
  errors: ErrorSummaryItem[];

  /**
   * Callback when an error link is clicked.
   * Receives the targetId so the host can scroll/focus the relevant field.
   */
  onErrorClick?: (targetId: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
