import React from 'react';
import { classNames } from '@/utils/classNames';
import { GovFormGroup } from './GovFormGroup';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  hint?: string;
  disabled?: boolean;
}

export function GovSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  hint,
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
      <select
        className={classNames('govuk-select', error && 'govuk-select--error')}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </GovFormGroup>
  );
}
