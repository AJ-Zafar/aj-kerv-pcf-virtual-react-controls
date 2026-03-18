import * as React from 'react';

export interface ErrorMessageProps {
  /**
   * Error message text content
   */
  children: React.ReactNode;
  
  /**
   * HTML id attribute (used for aria-describedby)
   */
  id?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Visually hidden text prefix for screen readers
   * @default 'Error'
   */
  visuallyHiddenText?: string;
}
