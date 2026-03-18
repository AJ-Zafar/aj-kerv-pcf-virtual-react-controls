import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TableBodyCell, TableHeadCell, TableProps } from './Table.types';
import './Table.css';

/**
 * Table component for displaying tabular data
 * Follows GOV.UK Design System table pattern
 */
export const Table: React.FC<TableProps> = ({
  caption,
  captionClasses,
  head,
  body,
  firstCellIsHeader,
  emptyMessage = 'No data available',
  compact,
  zebra,
  smallTextUntilTablet,
  className,
}) => {
  const resolvedHead: TableHeadCell[] = head || [];
  const resolvedBody: TableBodyCell[][] = body;

  const tableClasses = classNames(
    'govuk-table',
    smallTextUntilTablet && 'govuk-table--small-text-until-tablet',
    compact && 'govuk-table--compact',
    zebra && 'govuk-table--zebra',
    className
  );

  const captionClassName = classNames('govuk-table__caption', captionClasses);

  const renderBodyCell = (cell: TableBodyCell, rowIndex: number, cellIndex: number) => {
    const cellContent = cell.content !== undefined ? cell.content : cell.text;

    if (firstCellIsHeader && cellIndex === 0) {
      return (
        <th
          key={`row-${rowIndex}-header-${cellIndex}`}
          scope="row"
          className={classNames('govuk-table__header', cell.classes)}
          colSpan={cell.colSpan}
          rowSpan={cell.rowSpan}
        >
          {cellContent}
        </th>
      );
    }

    return (
      <td
        key={`row-${rowIndex}-cell-${cellIndex}`}
        className={classNames(
          'govuk-table__cell',
          cell.format && `govuk-table__cell--${cell.format}`,
          cell.classes
        )}
        colSpan={cell.colSpan}
        rowSpan={cell.rowSpan}
      >
        {cellContent}
      </td>
    );
  };

  return (
    <table className={tableClasses}>
      {caption && (
        <caption className={captionClassName}>{caption}</caption>
      )}
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {resolvedHead.map((headerCell, index) => (
            <th
              key={`head-${index}`}
              scope="col"
              className={classNames(
                'govuk-table__header',
                headerCell.format && `govuk-table__header--${headerCell.format}`,
                headerCell.classes
              )}
              colSpan={headerCell.colSpan}
              rowSpan={headerCell.rowSpan}
            >
              {headerCell.content !== undefined ? headerCell.content : headerCell.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {resolvedBody.length === 0 ? (
          <tr className="govuk-table__row">
            <td
              colSpan={Math.max(1, resolvedHead.length)}
              className="govuk-table__cell govuk-table__cell--empty"
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          resolvedBody.map((row, rowIndex) => (
            <tr
              key={rowIndex}
                className="govuk-table__row"
            >
              {row.map((cell, cellIndex) => renderBodyCell(cell, rowIndex, cellIndex))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
