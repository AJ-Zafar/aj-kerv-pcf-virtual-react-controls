import * as React from 'react';

export interface SummaryListRow {
  /**
   * Row key (label)
   */
  key: string;
  
  /**
   * Row value (content)
   */
  value: React.ReactNode;
  
  /**
   * Optional actions (e.g., edit/change links)
   */
  actions?: React.ReactNode;

  /**
   * Remove border from this specific row
   */
  noBorder?: boolean;
}

export interface SummaryListProps {
  /**
   * Array of summary rows
   */
  rows: SummaryListRow[];
  
  /**
   * Remove borders from all rows
   */
  noBorder?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
