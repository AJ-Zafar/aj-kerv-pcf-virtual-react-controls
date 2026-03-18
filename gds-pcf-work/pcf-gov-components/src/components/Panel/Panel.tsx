import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { PanelProps } from './Panel.types';
import './Panel.css';

/**
 * Panel component for confirmation / success pages.
 * Follows GOV.UK Design System panel pattern.
 */
export const Panel: React.FC<PanelProps> = function Panel(props) {
  var title = props.title;
  var children = props.children;
  var headingLevel = props.headingLevel || 1;
  var className = props.className;
  var id = props.id;

  var HeadingTag = ('h' + headingLevel) as keyof JSX.IntrinsicElements;

  return (
    <div
      id={id}
      className={classNames('govuk-panel', 'govuk-panel--confirmation', className)}
    >
      <HeadingTag className="govuk-panel__title">{title}</HeadingTag>
      {children && (
        <div className="govuk-panel__body">
          {children}
        </div>
      )}
    </div>
  );
};
