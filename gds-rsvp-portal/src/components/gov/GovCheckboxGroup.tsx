import React from 'react';
import { classNames } from '@/utils/classNames';
import { GovFormGroup } from './GovFormGroup';
import { GovFieldset } from './GovFieldset';

interface CheckboxOption {
  value: string;
  label: string;
  hint?: string;
}

interface Props {
  id: string;
  name: string;
  legend: string;
  legendSize?: 's' | 'm' | 'l' | 'xl';
  values: string[];
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  error?: string;
  hint?: string;
  disabled?: boolean;
}

export function GovCheckboxGroup({
  id,
  name,
  legend,
  legendSize = 'm',
  values,
  onChange,
  options,
  error,
  hint,
  disabled,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const toggle = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <GovFormGroup error={!!error}>
      <GovFieldset legend={legend} legendSize={legendSize} describedBy={describedBy}>
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
        <div className="govuk-checkboxes" data-module="govuk-checkboxes">
          {options.map((opt) => {
            const cbId = `${id}-${opt.value}`;
            return (
              <div key={opt.value} className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id={cbId}
                  name={name}
                  type="checkbox"
                  value={opt.value}
                  checked={values.includes(opt.value)}
                  onChange={() => toggle(opt.value)}
                  disabled={disabled}
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor={cbId}
                >
                  {opt.label}
                </label>
                {opt.hint && (
                  <div className="govuk-hint govuk-checkboxes__hint">
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
}
