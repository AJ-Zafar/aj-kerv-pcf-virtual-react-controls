export interface PaginationProps {
  /**
   * Current page number (1-based)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Page change handler
   */
  onPageChange: (page: number) => void;

  /**
   * Show Previous/Next labels (default true)
   */
  showPrevNextLabels?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
