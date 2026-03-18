import * as React from 'react';

export interface BackLinkProps {
  /**
   * Link text
   * @default 'Back'
   */
  children?: React.ReactNode;

  /**
   * URL to navigate back to. If omitted, onClick should be provided.
   */
  href?: string;

  /**
   * Click handler — use instead of href for in-app navigation or PCF callback
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Inverse variant for use on dark backgrounds
   */
  inverse?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
