import React from 'react';
import { classNames } from '@/utils/classNames';

interface Props {
  children: React.ReactNode;
  error?: boolean;
  className?: string;
}

export function GovFormGroup({ children, error, className }: Props) {
  return (
    <div
      className={classNames(
        'govuk-form-group',
        error && 'govuk-form-group--error',
        className
      )}
    >
      {children}
    </div>
  );
}
