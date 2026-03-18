import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { PhaseBannerProps } from './PhaseBanner.types';
import './PhaseBanner.css';

/**
 * Phase banner — indicates a service is in alpha or beta phase.
 * Renders a Tag + text inside a bordered banner strip.
 */
export const PhaseBanner: React.FC<PhaseBannerProps> = ({
  tag,
  tagClassName,
  children,
  className,
}) => {
  const bannerClasses = classNames(
    'govuk-phase-banner',
    className
  );

  const tagClasses = classNames(
    'govuk-tag',
    'govuk-phase-banner__content__tag',
    tagClassName
  );

  return (
    <div className={bannerClasses}>
      <p className="govuk-phase-banner__content">
        <strong className={tagClasses}>{tag}</strong>
        <span className="govuk-phase-banner__text">
          {children}
        </span>
      </p>
    </div>
  );
};
