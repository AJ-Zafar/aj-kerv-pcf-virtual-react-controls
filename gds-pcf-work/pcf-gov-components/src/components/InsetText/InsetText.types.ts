import * as React from 'react';

export interface InsetTextProps {
  /**
   * Content to display inside the inset text block.
   */
  children: React.ReactNode;

  /**
   * Optional additional CSS class name(s).
   */
  className?: string;

  /**
   * Optional id attribute.
   */
  id?: string;
}
