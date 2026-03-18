import * as React from 'react';

export interface LabelProps {
  /**
   * Label text content
   */
  children: React.ReactNode;
  
  /**
   * The id of the form element this label is for
   */
  htmlFor?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
