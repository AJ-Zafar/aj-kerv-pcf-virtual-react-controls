import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';
import './Breadcrumbs.css';

const renderItemContent = (item: BreadcrumbItem) => {
  if (item.isCurrent) {
    return (
      <span className="govuk-breadcrumbs__current" aria-current="page">
        {item.text}
      </span>
    );
  }

  if (item.href) {
    return (
      <a className="govuk-breadcrumbs__link" href={item.href}>
        {item.text}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        className="govuk-breadcrumbs__button"
        onClick={item.onClick}
      >
        {item.text}
      </button>
    );
  }

  return <span className="govuk-breadcrumbs__link">{item.text}</span>;
};

/**
 * Breadcrumbs component
 * Follows GOV.UK Design System breadcrumb pattern
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const breadcrumbsClasses = classNames('govuk-breadcrumbs', className);

  return (
    <nav className={breadcrumbsClasses} aria-label="Breadcrumb">
      <ol className="govuk-breadcrumbs__list">
        {items.map((item) => (
          <li
            key={`${item.text}-${item.href || 'nolink'}-${item.isCurrent ? 'current' : 'item'}`}
            className="govuk-breadcrumbs__list-item"
          >
            {renderItemContent(item)}
          </li>
        ))}
      </ol>
    </nav>
  );
};
