import * as React from 'react';

export interface AccordionSection {
  /**
   * Section heading text.
   */
  heading: React.ReactNode;

  /**
   * Optional summary text shown beside the heading.
   */
  summary?: React.ReactNode;

  /**
   * Section body content revealed when expanded.
   */
  children: React.ReactNode;

  /**
   * Whether this section starts expanded.
   * @default false
   */
  expanded?: boolean;
}

export interface AccordionProps {
  /**
   * Array of accordion sections.
   */
  sections: AccordionSection[];

  /**
   * Optional id — used to generate ids for section elements.
   */
  id?: string;

  /**
   * Heading level for section headings.
   * @default 2
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;

  /**
   * Text for the "Show all sections" / "Hide all sections" toggle.
   * @default { showAll: 'Show all sections', hideAll: 'Hide all sections' }
   */
  showAllText?: string;
  hideAllText?: string;

  /**
   * Whether to show the "Show all sections" control.
   * @default true
   */
  showAllEnabled?: boolean;

  /**
   * Callback fired when a section is toggled. Receives the section index
   * and whether it is now expanded.
   */
  onToggle?: (index: number, expanded: boolean) => void;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;
}
