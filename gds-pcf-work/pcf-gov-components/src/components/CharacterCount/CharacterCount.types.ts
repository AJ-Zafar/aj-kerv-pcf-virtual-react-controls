import * as React from 'react';

export interface CharacterCountProps {
  /**
   * HTML id for the textarea.
   */
  id: string;

  /**
   * HTML name for the textarea.
   */
  name: string;

  /**
   * Current textarea value.
   */
  value: string;

  /**
   * Change handler for the textarea.
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Maximum number of characters allowed.
   * Provide either maxLength or maxWords, not both.
   */
  maxLength?: number;

  /**
   * Maximum number of words allowed.
   * Provide either maxLength or maxWords, not both.
   */
  maxWords?: number;

  /**
   * Label text displayed above the textarea.
   */
  label: React.ReactNode;

  /**
   * Whether the label should be visually styled as a heading.
   */
  labelIsHeading?: boolean;

  /**
   * Label size variant.
   */
  labelSize?: 's' | 'm' | 'l' | 'xl';

  /**
   * Optional hint text below the label.
   */
  hint?: React.ReactNode;

  /**
   * Error message text. Applies error styling when set.
   */
  errorMessage?: React.ReactNode;

  /**
   * Number of visible textarea rows.
   * @default 5
   */
  rows?: number;

  /**
   * Whether the textarea is disabled.
   */
  disabled?: boolean;

  /**
   * Threshold percentage (0-100). The count message stays hidden until
   * this percentage of the limit is reached.
   * @default 0
   */
  threshold?: number;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;
}
