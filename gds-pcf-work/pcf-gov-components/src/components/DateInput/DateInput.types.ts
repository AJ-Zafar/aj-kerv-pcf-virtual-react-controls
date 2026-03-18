import * as React from 'react';

export interface DateInputValue {
  day: string;
  month: string;
  year: string;
}

export interface DateInputProps {
  /**
   * Unique id prefix — used to generate ids for each sub-input.
   * The day input gets `{id}-day`, month `{id}-month`, year `{id}-year`.
   */
  id: string;

  /**
   * Name prefix — each sub-input gets `{name}-day`, `{name}-month`, `{name}-year`.
   */
  name: string;

  /**
   * Current date value object.
   */
  value: DateInputValue;

  /**
   * Change handler — fires on any sub-field change with the full updated value.
   */
  onChange: (value: DateInputValue) => void;

  /**
   * Legend text for the wrapping fieldset.
   */
  legend: React.ReactNode;

  /**
   * Legend size variant — maps to govuk-fieldset__legend modifiers.
   */
  legendSize?: 's' | 'm' | 'l' | 'xl';

  /**
   * Whether the legend also acts as the page heading (wraps in h1).
   * @default false
   */
  legendIsHeading?: boolean;

  /**
   * Optional hint text displayed below the legend.
   */
  hint?: React.ReactNode;

  /**
   * Error message text. When set, error styling is applied.
   */
  errorMessage?: React.ReactNode;

  /**
   * Which fields have errors — applies error border to individual inputs.
   * When not specified but errorMessage is set, all fields get error styling.
   */
  errorFields?: Array<'day' | 'month' | 'year'>;

  /**
   * Whether all inputs are disabled.
   */
  disabled?: boolean;

  /**
   * Optional additional CSS class name(s) on the outer wrapper.
   */
  className?: string;
}
