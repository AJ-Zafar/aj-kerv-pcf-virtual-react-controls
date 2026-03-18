import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { CheckboxGroupProps } from './CheckboxGroup.types';
import './CheckboxGroup.css';

/**
 * Checkbox group component for multiple selections
 * Follows GOV.UK Design System checkboxes pattern
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  name,
  legend,
  values,
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

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      // Add to selection
      onChange([...values, optionValue]);
    } else {
      // Remove from selection
      onChange(values.filter(v => v !== optionValue));
    }
  };

  return (
    <fieldset
      className={fieldsetClasses}
      aria-describedby={describedBy || undefined}
    >
      <legend className="govuk-fieldset__legend">
        {legend}
      </legend>
      
      <div className="govuk-checkboxes">
        {options.map((option) => {
          const checkboxId = `${id}-${option.value}`;
          const hintId = option.hint ? `${checkboxId}-hint` : undefined;
          const isChecked = values.indexOf(option.value) !== -1;
          const isDisabled = disabled || option.disabled;

          return (
            <div key={option.value} className="govuk-checkboxes__item">
              <input
                id={checkboxId}
                name={name}
                type="checkbox"
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                className="govuk-checkboxes__input"
                aria-describedby={hintId}
              />
              <label
                htmlFor={checkboxId}
                className="govuk-label govuk-checkboxes__label"
              >
                {option.label}
              </label>
              {option.hint && (
                <div id={hintId} className="govuk-hint govuk-checkboxes__hint">
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
