import * as React from 'react';

export interface ButtonProps {
  /**
   * Button text content
   */
  children: React.ReactNode;
  
  /**
   * Button type attribute
   * @default 'submit'
   */
  type?: 'submit' | 'button' | 'reset';
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button should take full width (mobile default pattern)
   */
  fullWidth?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Variant styling
   */
  variant?: 'secondary' | 'warning' | 'inverse' | 'start';
}
