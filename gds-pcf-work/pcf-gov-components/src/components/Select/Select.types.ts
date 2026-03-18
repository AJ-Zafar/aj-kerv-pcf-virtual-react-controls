import * as React from 'react';

export interface SelectProps {
  /**
   * HTML id attribute
   */
  id: string;
  
  /**
   * HTML name attribute
   */
  name: string;
  
  /**
   * Selected value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  
  /**
   * Option elements
   */
  children: React.ReactNode;
  
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the select has an error
   */
  error?: boolean;
  
  /**
   * Space-separated IDs of elements that describe this select (for aria-describedby)
   */
  describedBy?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
