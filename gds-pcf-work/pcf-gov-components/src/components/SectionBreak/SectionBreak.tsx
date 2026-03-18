import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { SectionBreakProps } from './SectionBreak.types';
import './SectionBreak.css';

/**
 * Section break — a thematic break between sections of content.
 * Renders an <hr> with optional size and visible line.
 */
export const SectionBreak: React.FC<SectionBreakProps> = ({
  size,
  visible,
  className,
}) => {
  const classes = classNames(
    'govuk-section-break',
    size && ('govuk-section-break--' + size),
    visible && 'govuk-section-break--visible',
    className
  );

  return React.createElement('hr', { className: classes });
};
