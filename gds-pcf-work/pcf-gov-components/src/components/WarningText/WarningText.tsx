import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { WarningTextProps } from './WarningText.types';
import './WarningText.css';

/**
 * Warning text component to warn users about something important.
 * Follows GOV.UK Design System warning text pattern.
 */
export const WarningText: React.FC<WarningTextProps> = function WarningText(props) {
  var children = props.children;
  var iconFallbackText = props.iconFallbackText || 'Warning';
  var className = props.className;
  var id = props.id;

  return (
    <div
      id={id}
      className={classNames('govuk-warning-text', className)}
    >
      <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{iconFallbackText}</span>
        {children}
      </strong>
    </div>
  );
};
