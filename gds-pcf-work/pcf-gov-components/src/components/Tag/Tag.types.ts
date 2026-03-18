import * as React from 'react';

export interface TagProps {
  /**
   * Tag content
   */
  children: React.ReactNode;
  
  /**
   * Color tone/variant
   */
  tone?: 'grey' | 'green' | 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'pink';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
