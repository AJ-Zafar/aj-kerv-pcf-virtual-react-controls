import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { DateInputProps } from './DateInput.types';
import './DateInput.css';

/**
 * Date input component with separate day, month, year fields.
 * Follows GOV.UK Design System date input pattern.
 * Wraps inputs in a fieldset with legend for accessibility.
 */
export const DateInput: React.FC<DateInputProps> = function DateInput(props) {
  var id = props.id;
  var name = props.name;
  var value = props.value;
  var onChange = props.onChange;
  var legend = props.legend;
  var legendSize = props.legendSize;
  var legendIsHeading = props.legendIsHeading;
  var hint = props.hint;
  var errorMessage = props.errorMessage;
  var errorFields = props.errorFields;
  var disabled = props.disabled;
  var className = props.className;

  var hintId = id + '-hint';
  var errorId = id + '-error';
  var hasError = !!errorMessage;

  // Build aria-describedby
  var describedBy: string[] = [];
  if (hint) { describedBy.push(hintId); }
  if (hasError) { describedBy.push(errorId); }
  var describedByStr = describedBy.length > 0 ? describedBy.join(' ') : undefined;

  function hasFieldError(field: 'day' | 'month' | 'year'): boolean {
    if (!hasError) return false;
    if (!errorFields) return true; // all fields get error when no specific fields listed
    return errorFields.indexOf(field) !== -1;
  }

  function handleFieldChange(field: 'day' | 'month' | 'year', event: React.ChangeEvent<HTMLInputElement>) {
    var updated = { day: value.day, month: value.month, year: value.year };
    updated[field] = event.target.value;
    onChange(updated);
  }

  var legendContent = legendIsHeading
    ? React.createElement('h1', { className: 'govuk-fieldset__heading' }, legend)
    : legend;

  var fields: Array<{ label: string; field: 'day' | 'month' | 'year'; width: string }> = [
    { label: 'Day', field: 'day', width: '2' },
    { label: 'Month', field: 'month', width: '2' },
    { label: 'Year', field: 'year', width: '4' }
  ];

  return (
    <div className={classNames(
      'govuk-form-group',
      hasError && 'govuk-form-group--error',
      className
    )}>
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={describedByStr}
      >
        <legend className={classNames(
          'govuk-fieldset__legend',
          legendSize && ('govuk-fieldset__legend--' + legendSize)
        )}>
          {legendContent}
        </legend>

        {hint && (
          <div id={hintId} className="govuk-hint">
            {hint}
          </div>
        )}

        {hasError && (
          <p id={errorId} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errorMessage}
          </p>
        )}

        <div className="govuk-date-input" id={id}>
          {fields.map(function (f) {
            var inputId = id + '-' + f.field;
            var inputName = name + '-' + f.field;
            return (
              <div key={f.field} className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-date-input__label" htmlFor={inputId}>
                    {f.label}
                  </label>
                  <input
                    className={classNames(
                      'govuk-input',
                      'govuk-date-input__input',
                      'govuk-input--width-' + f.width,
                      hasFieldError(f.field) && 'govuk-input--error'
                    )}
                    id={inputId}
                    name={inputName}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={value[f.field]}
                    onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
                      handleFieldChange(f.field, e);
                    }}
                    disabled={disabled}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};
