import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { RadioGroupProps } from './RadioGroup.types';
import './RadioGroup.css';

/**
 * Radio group component for single selection
 * Follows GOV.UK Design System radios pattern
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  name,
  legend,
  value,
  onChange,
  options,
  disabled,
  error,
  describedBy,
  className,
}) => {
  const fieldsetClasses = classNames(
    'govuk-form-group',
    error && 'govuk-form-group--error',
    className
  );

  const handleRadioChange = (optionValue: string) => {
    onChange(optionValue);
  };

  return (
    <fieldset
      className={fieldsetClasses}
      aria-describedby={describedBy || undefined}
    >
      <legend className="govuk-fieldset__legend">
        {legend}
      </legend>
      
      <div className="govuk-radios">
        {options.map((option) => {
          const radioId = `${id}-${option.value}`;
          const hintId = option.hint ? `${radioId}-hint` : undefined;
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <div key={option.value} className="govuk-radios__item">
              <input
                id={radioId}
                name={name}
                type="radio"
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => handleRadioChange(option.value)}
                className="govuk-radios__input"
                aria-describedby={hintId}
              />
              <label
                htmlFor={radioId}
                className="govuk-label govuk-radios__label"
              >
                {option.label}
              </label>
              {option.hint && (
                <div id={hintId} className="govuk-hint govuk-radios__hint">
                  {option.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
