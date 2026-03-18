import * as React from 'react';

export interface RadioOption {
  /**
   * Radio value
   */
  value: string;
  
  /**
   * Label text
   */
  label: string;
  
  /**
   * Optional hint text
   */
  hint?: string;
  
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /**
   * Base ID for the fieldset (individual radios get derived IDs)
   */
  id: string;
  
  /**
   * HTML name attribute for all radios
   */
  name: string;
  
  /**
   * Legend text for the fieldset
   */
  legend: string;
  
  /**
   * Selected value
   */
  value: string;
  
  /**
   * Change handler - receives the new selected value
   */
  onChange: (value: string) => void;
  
  /**
   * Radio options
   */
  options: RadioOption[];
  
  /**
   * Whether all radios are disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the group has an error
   */
  error?: boolean;
  
  /**
   * Space-separated IDs of elements that describe this group (for aria-describedby on fieldset)
   */
  describedBy?: string;
  
  /**
   * Additional CSS classes for fieldset
   */
  className?: string;
}
