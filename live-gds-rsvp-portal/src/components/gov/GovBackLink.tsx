import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  href: string;
  children?: React.ReactNode;
}

export function GovBackLink({ href, children = 'Back' }: Props) {
  return (
    <Link to={href} className="govuk-back-link">
      {children}
    </Link>
  );
}
