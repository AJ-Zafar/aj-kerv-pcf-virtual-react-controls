import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { SectionProps } from './Section.types';
import './Section.css';

/**
 * Section component for semantically grouping related content
 * Useful for organizing form controls or related information
 */
export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  actions,
  className,
}) => {
  const classes = classNames('govuk-section', className);

  return (
    <section className={classes}>
      {(title || actions) && (
        <div className="govuk-section__header">
          {title && <h2 className="govuk-section__title">{title}</h2>}
          {actions && <div className="govuk-section__actions">{actions}</div>}
        </div>
      )}
      {description && <p className="govuk-section__description">{description}</p>}
      <div className="govuk-section__content">{children}</div>
    </section>
  );
};
