import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { BackLinkProps } from './BackLink.types';
import './BackLink.css';

/**
 * Back link component for navigating to the previous page.
 * Follows GOV.UK Design System back link pattern.
 */
export const BackLink: React.FC<BackLinkProps> = function BackLink(props) {
  var children = props.children || 'Back';
  var href = props.href;
  var onClick = props.onClick;
  var inverse = props.inverse;
  var className = props.className;

  return (
    <a
      href={href || '#'}
      className={classNames(
        'govuk-back-link',
        inverse && 'govuk-back-link--inverse',
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
