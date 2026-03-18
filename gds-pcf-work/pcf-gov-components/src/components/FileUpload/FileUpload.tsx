import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { FileUploadProps } from './FileUpload.types';
import './FileUpload.css';

/**
 * File upload component — native file input with GOV.UK form group,
 * label, hint and error integration.
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  label,
  labelIsHeading,
  labelSize,
  hint,
  errorMessage,
  multiple,
  accept,
  disabled,
  onChange,
  className,
}) => {
  var hintId = hint ? id + '-hint' : undefined;
  var errorId = errorMessage ? id + '-error' : undefined;

  var describedByParts: string[] = [];
  if (hintId) describedByParts.push(hintId);
  if (errorId) describedByParts.push(errorId);
  var describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

  var formGroupClasses = classNames(
    'govuk-form-group',
    errorMessage && 'govuk-form-group--error'
  );

  var labelClasses = classNames(
    'govuk-label',
    labelSize && ('govuk-label--' + labelSize)
  );

  var inputClasses = classNames(
    'govuk-file-upload',
    errorMessage && 'govuk-file-upload--error',
    className
  );

  var labelElement = React.createElement(
    'label',
    { className: labelClasses, htmlFor: id },
    label
  );

  return (
    <div className={formGroupClasses}>
      {labelIsHeading
        ? <h1 className="govuk-label-wrapper">{labelElement}</h1>
        : labelElement
      }

      {hint && (
        <div id={hintId} className="govuk-hint">
          {hint}
        </div>
      )}

      {errorMessage && (
        <p id={errorId} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {errorMessage}
        </p>
      )}

      <input
        className={inputClasses}
        id={id}
        name={name}
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={errorMessage ? 'true' : undefined}
      />
    </div>
  );
};
