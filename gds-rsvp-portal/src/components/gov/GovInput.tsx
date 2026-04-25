import React from 'react';
import { classNames } from '@/utils/classNames';
import { GovFormGroup } from './GovFormGroup';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  hint?: string;
  width?: '2' | '3' | '4' | '5' | '10' | '20' | '30';
  autoComplete?: string;
  disabled?: boolean;
}

export function GovInput({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  error,
  hint,
  width,
  autoComplete,
  disabled,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <GovFormGroup error={!!error}>
      <label className="govuk-label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <div id={hintId} className="govuk-hint">
          {hint}
        </div>
      )}
      {error && (
        <p id={errorId} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <input
        className={classNames(
          'govuk-input',
          error && 'govuk-input--error',
          width && `govuk-input--width-${width}`
        )}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </GovFormGroup>
  );
}
