import React from 'react';
import { classNames } from '@/utils/classNames';
import { GovFormGroup } from './GovFormGroup';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  error?: string;
  hint?: string;
  disabled?: boolean;
  maxLength?: number;
}

export const GovTextarea = React.memo(function GovTextarea({
  id,
  name,
  label,
  value,
  onChange,
  rows = 5,
  error,
  hint,
  disabled,
  maxLength,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const countId = maxLength ? `${id}-info` : undefined;
  const describedBy = [hintId, errorId, countId].filter(Boolean).join(' ') || undefined;

  const remaining = maxLength ? maxLength - value.length : undefined;
  const isOverLimit = remaining !== undefined && remaining < 0;

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
      <textarea
        className={classNames(
          'govuk-textarea',
          error && 'govuk-textarea--error',
          isOverLimit && 'govuk-textarea--error'
        )}
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        disabled={disabled}
      />
      {maxLength && (
        <div
          id={countId}
          className={classNames(
            'govuk-hint govuk-character-count__message',
            isOverLimit && 'govuk-error-message'
          )}
          aria-live="polite"
        >
          {isOverLimit
            ? `You have ${Math.abs(remaining!)} characters too many`
            : `You have ${remaining} characters remaining`}
        </div>
      )}
    </GovFormGroup>
  );
});
