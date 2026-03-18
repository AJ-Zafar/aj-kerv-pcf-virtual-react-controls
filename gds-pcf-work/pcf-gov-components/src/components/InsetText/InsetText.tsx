import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { InsetTextProps } from './InsetText.types';
import './InsetText.css';

/**
 * Inset text component to differentiate a block of text from surrounding content.
 * Follows GOV.UK Design System inset text pattern.
 */
export const InsetText: React.FC<InsetTextProps> = function InsetText(props) {
  var children = props.children;
  var className = props.className;
  var id = props.id;

  return (
    <div
      id={id}
      className={classNames('govuk-inset-text', className)}
    >
      {children}
    </div>
  );
};
