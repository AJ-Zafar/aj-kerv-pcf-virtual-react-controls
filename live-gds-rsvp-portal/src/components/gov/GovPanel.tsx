import React from 'react';

interface Props {
  title: string;
  body?: string;
  children?: React.ReactNode;
}

export function GovPanel({ title, body, children }: Props) {
  return (
    <div className="govuk-panel govuk-panel--confirmation">
      <h1 className="govuk-panel__title">{title}</h1>
      {body && <div className="govuk-panel__body">{body}</div>}
      {children}
    </div>
  );
}
