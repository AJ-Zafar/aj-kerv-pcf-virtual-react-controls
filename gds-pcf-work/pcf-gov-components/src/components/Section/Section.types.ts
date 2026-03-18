import * as React from 'react';

export interface SectionProps {
  /**
   * Section content
   */
  children: React.ReactNode;
  
  /**
   * Section title (optional)
   */
  title?: string;
  
  /**
   * Section description text (optional)
   */
  description?: string;
  
  /**
   * Action buttons or links to display at the top (optional)
   */
  actions?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
