import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { DetailsProps } from './Details.types';
import './Details.css';

/**
 * Details component for progressive disclosure.
 * Uses the native HTML <details> element.
 * Follows GOV.UK Design System details pattern.
 */
export const Details: React.FC<DetailsProps> = function Details(props) {
  var summary = props.summary;
  var children = props.children;
  var open = props.open;
  var className = props.className;

  return (
    <details
      className={classNames('govuk-details', className)}
      open={open}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {summary}
        </span>
      </summary>
      <div className="govuk-details__text">
        {children}
      </div>
    </details>
  );
};
