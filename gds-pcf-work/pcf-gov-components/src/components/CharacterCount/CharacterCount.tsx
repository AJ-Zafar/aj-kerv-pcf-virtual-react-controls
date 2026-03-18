import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { CharacterCountProps } from './CharacterCount.types';
import './CharacterCount.css';

function countWords(text: string): number {
  var trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Character count component — a textarea with a live remaining count.
 * Follows GOV.UK Design System character count pattern.
 * Stateless: value and onChange are fully controlled by the parent.
 */
export var CharacterCount: React.FC<CharacterCountProps> = function CharacterCount(props) {
  var id = props.id;
  var name = props.name;
  var value = props.value;
  var onChange = props.onChange;
  var maxLength = props.maxLength;
  var maxWords = props.maxWords;
  var label = props.label;
  var labelIsHeading = props.labelIsHeading;
  var labelSize = props.labelSize;
  var hint = props.hint;
  var errorMessage = props.errorMessage;
  var rows = props.rows !== undefined ? props.rows : 5;
  var disabled = props.disabled;
  var threshold = props.threshold !== undefined ? props.threshold : 0;
  var className = props.className;

  var hasError = !!errorMessage;
  var hintId = id + '-hint';
  var errorId = id + '-error';
  var countMessageId = id + '-info';

  // Calculate remaining
  var limit = maxWords || maxLength || 0;
  var currentCount = maxWords ? countWords(value) : value.length;
  var remaining = limit - currentCount;
  var isOverLimit = remaining < 0;

  // Threshold: hide message until threshold% of limit is used
  var thresholdReached = threshold > 0
    ? currentCount >= (limit * threshold / 100)
    : true;

  // Build message text
  var countType = maxWords ? 'word' : 'character';
  var absRemaining = Math.abs(remaining);
  var messageText: string;
  if (isOverLimit) {
    messageText = 'You have ' + absRemaining + ' ' + countType + (absRemaining !== 1 ? 's' : '') + ' too many';
  } else {
    messageText = 'You have ' + remaining + ' ' + countType + (remaining !== 1 ? 's' : '') + ' remaining';
  }

  // Build aria-describedby
  var describedByParts: string[] = [];
  if (hint) { describedByParts.push(hintId); }
  if (hasError) { describedByParts.push(errorId); }
  describedByParts.push(countMessageId);
  var describedBy = describedByParts.join(' ');

  var labelContent = labelIsHeading
    ? React.createElement('h1', { className: 'govuk-label-wrapper' },
        React.createElement('label', {
          className: classNames('govuk-label', labelSize && ('govuk-label--' + labelSize)),
          htmlFor: id
        }, label)
      )
    : React.createElement('label', {
        className: classNames('govuk-label', labelSize && ('govuk-label--' + labelSize)),
        htmlFor: id
      }, label);

  return (
    <div className={classNames(
      'govuk-character-count',
      className
    )}>
      <div className={classNames(
        'govuk-form-group',
        hasError && 'govuk-form-group--error'
      )}>
        {labelContent}

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

        <textarea
          id={id}
          name={name}
          className={classNames(
            'govuk-textarea',
            (hasError || isOverLimit) && 'govuk-textarea--error'
          )}
          rows={rows}
          aria-describedby={describedBy}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      <div
        id={countMessageId}
        className={classNames(
          'govuk-hint',
          'govuk-character-count__message',
          !thresholdReached && 'govuk-character-count__message--disabled',
          isOverLimit && 'govuk-error-message'
        )}
        aria-live="polite"
        aria-relevant="text"
      >
        {thresholdReached ? messageText : ''}
      </div>
    </div>
  );
};
