import * as React from 'react';

export interface CheckboxOption {
  /**
   * Checkbox value
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

export interface CheckboxGroupProps {
  /**
   * Base ID for the fieldset (individual checkboxes get derived IDs)
   */
  id: string;
  
  /**
   * HTML name attribute for all checkboxes
   */
  name: string;
  
  /**
   * Legend text for the fieldset
   */
  legend: string;
  
  /**
   * Array of selected values
   */
  values: string[];
  
  /**
   * Change handler - receives updated array of selected values
   */
  onChange: (values: string[]) => void;
  
  /**
   * Checkbox options
   */
  options: CheckboxOption[];
  
  /**
   * Whether all checkboxes are disabled
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
