import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TagProps } from './Tag.types';
import './Tag.css';

/**
 * Tag component for status indicators and labels
 * Follows GOV.UK Design System tag pattern
 */
export const Tag: React.FC<TagProps> = ({
  children,
  tone,
  className,
}) => {
  const tagClasses = classNames(
    'govuk-tag',
    tone && `govuk-tag--${tone}`,
    className
  );

  return (
    <strong className={tagClasses}>
      {children}
    </strong>
  );
};
