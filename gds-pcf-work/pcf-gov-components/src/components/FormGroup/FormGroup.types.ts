import * as React from 'react';

export interface FormGroupProps {
  /**
   * Content to be wrapped in the form group
   */
  children: React.ReactNode;
  
  /**
   * Whether this form group has an error
   */
  error?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
