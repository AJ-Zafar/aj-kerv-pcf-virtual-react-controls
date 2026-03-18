import * as React from 'react';

export interface TextInputProps {
  /**
   * HTML id attribute
   */
  id: string;
  
  /**
   * HTML name attribute
   */
  name: string;
  
  /**
   * Input value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'tel' | 'number' | 'search' | 'url';
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input has an error
   */
  error?: boolean;
  
  /**
   * Space-separated IDs of elements that describe this input (for aria-describedby)
   */
  describedBy?: string;
  
  /**
   * Width variant based on expected character count
   */
  width?: '2' | '3' | '4' | '5' | '10' | '20';
  
  /**
   * HTML autocomplete attribute
   */
  autoComplete?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
