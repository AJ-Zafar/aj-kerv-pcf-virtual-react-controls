import React from 'react';
import { classNames } from '@/utils/classNames';
import { GovFormGroup } from './GovFormGroup';
import { GovFieldset } from './GovFieldset';

interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

interface Props {
  id: string;
  name: string;
  legend: string;
  legendSize?: 's' | 'm' | 'l' | 'xl';
  isPageHeading?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
  hint?: string;
  inline?: boolean;
  disabled?: boolean;
}

export const GovRadioGroup = React.memo(function GovRadioGroup({
  id,
  name,
  legend,
  legendSize = 'l',
  isPageHeading = false,
  value,
  onChange,
  options,
  error,
  hint,
  inline,
  disabled,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <GovFormGroup error={!!error}>
      <GovFieldset
        legend={legend}
        legendSize={legendSize}
        isPageHeading={isPageHeading}
        describedBy={describedBy}
      >
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
        <div
          className={classNames(
            'govuk-radios',
            inline && 'govuk-radios--inline'
          )}
          data-module="govuk-radios"
        >
          {options.map((opt) => {
            const radioId = `${id}-${opt.value}`;
            const optHintId = opt.hint ? `${radioId}-hint` : undefined;
            return (
              <div key={opt.value} className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id={radioId}
                  name={name}
                  type="radio"
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  disabled={disabled}
                  aria-describedby={optHintId}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor={radioId}
                >
                  {opt.label}
                </label>
                {opt.hint && (
                  <div id={optHintId} className="govuk-hint govuk-radios__hint">
                    {opt.hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GovFieldset>
    </GovFormGroup>
  );
});
