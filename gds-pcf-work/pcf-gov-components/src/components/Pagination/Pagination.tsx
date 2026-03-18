import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { PaginationProps } from './Pagination.types';
import './Pagination.css';

const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);
  const pages: number[] = [];

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
};

/**
 * Pagination component
 * Follows GOV.UK Design System pagination pattern
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNextLabels = true,
  className,
}) => {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);
  const pages = getVisiblePages(safeCurrent, safeTotal);

  const paginationClasses = classNames('govuk-pagination', className);

  const handlePageChange = (page: number) => {
    if (page !== safeCurrent && page >= 1 && page <= safeTotal) {
      onPageChange(page);
    }
  };

  const prevDisabled = safeCurrent <= 1;
  const nextDisabled = safeCurrent >= safeTotal;

  return (
    <nav className={paginationClasses} aria-label="Pagination">
      <ul className="govuk-pagination__list">
        <li className="govuk-pagination__item govuk-pagination__item--prev">
          <button
            type="button"
            className="govuk-pagination__link"
            onClick={() => handlePageChange(safeCurrent - 1)}
            disabled={prevDisabled}
            aria-label="Previous page"
          >
            <svg className="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
              <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            {showPrevNextLabels && (
              <span className="govuk-pagination__link-title">
                Previous<span className="govuk-visually-hidden"> page</span>
              </span>
            )}
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={classNames(
              'govuk-pagination__item',
              page === safeCurrent && 'govuk-pagination__item--current'
            )}
          >
            <button
              type="button"
              className="govuk-pagination__link"
              onClick={() => handlePageChange(page)}
              aria-current={page === safeCurrent ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="govuk-pagination__item govuk-pagination__item--next">
          <button
            type="button"
            className="govuk-pagination__link"
            onClick={() => handlePageChange(safeCurrent + 1)}
            disabled={nextDisabled}
            aria-label="Next page"
          >
            {showPrevNextLabels && (
              <span className="govuk-pagination__link-title">
                Next<span className="govuk-visually-hidden"> page</span>
              </span>
            )}
            <svg className="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
