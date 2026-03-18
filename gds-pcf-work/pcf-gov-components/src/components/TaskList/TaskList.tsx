import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TaskListProps } from './TaskList.types';
import './TaskList.css';

/**
 * Task list component for showing steps with statuses.
 * Follows GOV.UK Design System task list pattern.
 */
export const TaskList: React.FC<TaskListProps> = function TaskList(props) {
  var items = props.items;
  var idPrefix = props.idPrefix || 'task-list';
  var className = props.className;
  var id = props.id;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul
      id={id}
      className={classNames('govuk-task-list', className)}
    >
      {items.map(function (item, index) {
        var itemId = idPrefix + '-' + index;
        var nameId = itemId + '-name';
        var statusId = itemId + '-status';
        var hintId = itemId + '-hint';
        var hasLink = !!(item.href || item.onClick);

        var titleContent: React.ReactNode;
        if (hasLink) {
          titleContent = (
            <a
              id={nameId}
              className="govuk-link govuk-task-list__link"
              href={item.href || '#'}
              aria-describedby={statusId}
              onClick={item.onClick}
            >
              {item.title}
            </a>
          );
        } else {
          titleContent = (
            <span id={nameId}>{item.title}</span>
          );
        }

        var statusContent: React.ReactNode;
        if (item.statusTagTone !== undefined) {
          statusContent = (
            <span className="govuk-task-list__status" id={statusId}>
              <strong className={classNames(
                'govuk-tag',
                'govuk-tag--' + item.statusTagTone
              )}>
                {item.status}
              </strong>
            </span>
          );
        } else {
          statusContent = (
            <span className={classNames(
              'govuk-task-list__status',
              !hasLink && 'govuk-task-list__status--cannot-start-yet'
            )} id={statusId}>
              {item.status}
            </span>
          );
        }

        return (
          <li
            key={index}
            className={classNames(
              'govuk-task-list__item',
              hasLink && 'govuk-task-list__item--with-link'
            )}
          >
            <div className="govuk-task-list__name-and-hint">
              {titleContent}
              {item.hint && (
                <div id={hintId} className="govuk-task-list__hint">
                  {item.hint}
                </div>
              )}
            </div>
            {statusContent}
          </li>
        );
      })}
    </ul>
  );
};
