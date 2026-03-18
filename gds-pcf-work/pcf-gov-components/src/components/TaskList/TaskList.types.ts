import * as React from 'react';

export interface TaskListItem {
  /**
   * Task name / title.
   */
  title: React.ReactNode;

  /**
   * Optional href — makes the task name a link.
   */
  href?: string;

  /**
   * Optional click handler for the task name.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Optional hint text shown below the task name.
   */
  hint?: React.ReactNode;

  /**
   * Status tag content — displayed on the right side.
   */
  status: React.ReactNode;

  /**
   * Tag colour for the status. When omitted, the status renders as plain text
   * (used for "Cannot start yet" style statuses).
   */
  statusTagTone?: 'grey' | 'green' | 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'pink';
}

export interface TaskListProps {
  /**
   * Array of task items to display.
   */
  items: TaskListItem[];

  /**
   * Optional id prefix for generated ids.
   */
  idPrefix?: string;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;
}
