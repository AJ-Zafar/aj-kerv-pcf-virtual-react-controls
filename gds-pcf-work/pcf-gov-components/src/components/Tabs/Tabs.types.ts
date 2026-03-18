import * as React from 'react';

export interface TabItem {
  /**
   * Tab label shown on the tab button.
   */
  label: string;

  /**
   * Unique id for the tab panel. Also used as the panel element id.
   */
  id: string;

  /**
   * Content displayed when this tab is active.
   */
  children: React.ReactNode;
}

export interface TabsProps {
  /**
   * Heading shown above the tab list (visible on mobile, hidden on tablet+).
   * @default 'Contents'
   */
  title?: string;

  /**
   * Array of tab items.
   */
  items: TabItem[];

  /**
   * Index of the initially selected tab (0-based).
   * @default 0
   */
  defaultIndex?: number;

  /**
   * Callback fired when the active tab changes. Receives the new index.
   */
  onChange?: (index: number) => void;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;

  /**
   * Optional id prefix for generated tab/panel ids.
   */
  idPrefix?: string;
}
