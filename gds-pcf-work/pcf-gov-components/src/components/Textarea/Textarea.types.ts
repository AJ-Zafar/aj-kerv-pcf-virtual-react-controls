import * as React from 'react';

export interface TextareaProps {
  /**
   * HTML id attribute
   */
  id: string;
  
  /**
   * HTML name attribute
   */
  name: string;
  
  /**
   * Textarea value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the textarea has an error
   */
  error?: boolean;
  
  /**
   * Space-separated IDs of elements that describe this textarea (for aria-describedby)
   */
  describedBy?: string;
  
  /**
   * Number of visible text lines
   * @default 5
   */
  rows?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
