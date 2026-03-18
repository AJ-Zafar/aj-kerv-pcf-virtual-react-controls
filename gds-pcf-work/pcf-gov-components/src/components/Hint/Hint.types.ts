import * as React from 'react';

export interface HintProps {
  /**
   * Hint text content
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
}
