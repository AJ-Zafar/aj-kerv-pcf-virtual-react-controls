export interface FilterOption {
  /**
   * Option label
   */
  label: string;

  /**
   * Option value
   */
  value: string;

  /**
   * Optional count to display
   */
  count?: number;

  /**
   * Option disabled state
   */
  disabled?: boolean;
}

export interface FilterSection {
  /**
   * Section id
   */
  id: string;

  /**
   * Section title
   */
  title: string;

  /**
   * Section options
   */
  options: FilterOption[];

  /**
   * Whether section is collapsible
   */
  collapsible?: boolean;

  /**
   * Initial expanded state (only when collapsible)
   */
  initiallyExpanded?: boolean;
}

export interface FilterPaneProps {
  /**
   * Pane title
   */
  title: string;

  /**
   * Filter sections
   */
  sections: FilterSection[];

  /**
   * Selected values keyed by section id
   */
  selectedValues: { [sectionId: string]: string[] };

  /**
   * Selection change handler
   */
  onSelectionChange: (selectedValues: { [sectionId: string]: string[] }) => void;

  /**
   * Optional apply handler
   */
  onApply?: () => void;

  /**
   * Optional clear handler
   */
  onClear?: () => void;

  /**
   * Enable local text filtering per section
   */
  searchable?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
