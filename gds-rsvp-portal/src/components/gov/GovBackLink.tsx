import React from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  children?: React.ReactNode;
}

export function GovBackLink({ href, children = 'Back' }: Props) {
  return (
    <Link href={href} className="govuk-back-link">
      {children}
    </Link>
  );
}
