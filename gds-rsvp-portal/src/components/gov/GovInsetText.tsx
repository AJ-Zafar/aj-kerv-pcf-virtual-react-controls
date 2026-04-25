import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function GovInsetText({ children }: Props) {
  return <div className="govuk-inset-text">{children}</div>;
}
