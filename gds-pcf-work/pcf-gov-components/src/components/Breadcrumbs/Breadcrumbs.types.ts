export interface BreadcrumbItem {
  /**
   * Breadcrumb text
   */
  text: string;

  /**
   * Optional link target
   */
  href?: string;

  /**
   * Optional click handler (used when href is not provided)
   */
  onClick?: () => void;

  /**
   * Indicates current page
   */
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Additional CSS classes
   */
  className?: string;
}
