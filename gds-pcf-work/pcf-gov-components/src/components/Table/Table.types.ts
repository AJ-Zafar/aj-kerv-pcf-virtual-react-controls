import * as React from 'react';

export interface TableHeadCell {
  /**
   * Header text
   */
  text?: string;

  /**
   * Header HTML/React content
   */
  content?: React.ReactNode;

  /**
   * Cell format variant (for example numeric)
   */
  format?: 'numeric';

  /**
   * Additional classes for this header cell
   */
  classes?: string;

  /**
   * Optional colspan
   */
  colSpan?: number;

  /**
   * Optional rowspan
   */
  rowSpan?: number;
}

export interface TableBodyCell {
  /**
   * Cell text
   */
  text?: string;

  /**
   * Cell HTML/React content
   */
  content?: React.ReactNode;

  /**
   * Cell format variant (for example numeric)
   */
  format?: 'numeric';

  /**
   * Additional classes for this body cell
   */
  classes?: string;

  /**
   * Optional colspan
   */
  colSpan?: number;

  /**
   * Optional rowspan
   */
  rowSpan?: number;
}

export interface TableProps {
  /**
   * Table caption (optional)
   */
  caption?: string;

  /**
   * Additional caption classes such as govuk-table__caption--m
   */
  captionClasses?: string;
  
  /**
   * Explicit head cells (GOV.UK-style).
   */
  head?: TableHeadCell[];

  /**
   * Explicit body rows (GOV.UK-style).
   */
  body: TableBodyCell[][];

  /**
   * If true, first body cell in each row is rendered as row header (th scope=row).
   */
  firstCellIsHeader?: boolean;
  
  /**
   * Message to show when rows array is empty
   */
  emptyMessage?: string;
  
  /**
   * Compact spacing variant
   */
  compact?: boolean;
  
  /**
   * Zebra striping (alternating row colors)
   */
  zebra?: boolean;

  /**
   * Small text variant on small screens for dense tables.
   */
  smallTextUntilTablet?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
