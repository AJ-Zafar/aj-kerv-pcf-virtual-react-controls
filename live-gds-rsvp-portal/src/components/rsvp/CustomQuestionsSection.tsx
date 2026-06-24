import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovInput } from '@/components/gov/GovInput';
import { GovTextarea } from '@/components/gov/GovTextarea';
import { GovRadioGroup } from '@/components/gov/GovRadioGroup';
import { GovSelect } from '@/components/gov/GovSelect';
import { GovCheckboxGroup } from '@/components/gov/GovCheckboxGroup';
import { GovButton } from '@/components/gov/GovButton';
import { GovErrorSummary } from '@/components/gov/GovErrorSummary';
import { EventQuestion, AttendeeFormData } from '@/types/dataverse';

interface Props {
  onContinue: () => void;
}

export function CustomQuestionsSection({ onContinue }: Props) {
  const {
    formData,
    errors,
    scenario,
    setQuestionAnswer,
    validateCurrentStep,
    clearErrors,
  } = useRsvp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validateCurrentStep('questions')) {
      onContinue();
    }
  };

  const errorItems = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  const rsvpQuestions = scenario.questions.filter(
    (q) => q.appliesTo === 'rsvp' || q.appliesTo === 'primaryAttendee'
  );
  const attendeeQuestions = scenario.questions.filter(
    (q) => q.appliesTo === 'allAttendees' || q.appliesTo === 'guestsOnly'
  );

  const allAttendees: AttendeeFormData[] = [
    formData.primaryAttendee,
    ...formData.guests,
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GovErrorSummary errors={errorItems} />

      <h1 className="govuk-heading-l">Additional questions</h1>

      {rsvpQuestions.map((q) => (
        <QuestionField
          key={q.questionId}
          question={q}
          answerKey={q.questionId}
          value={formData.questionAnswers[q.questionId] || ''}
          onChange={(val) => setQuestionAnswer(q.questionId, val)}
          error={errors[q.questionId]}
        />
      ))}

      {attendeeQuestions.length > 0 &&
        allAttendees.map((attendee, ai) => {
          if (
            attendeeQuestions.every((q) => q.appliesTo === 'guestsOnly') &&
            attendee.attendeeType === 'primary'
          ) {
            return null;
          }

          return (
            <div key={attendee.attendeeId} className="govuk-!-margin-bottom-6">
              <h2 className="govuk-heading-m">
                {attendee.attendeeType === 'primary'
                  ? `${attendee.firstName || 'You'} (primary attendee)`
                  : `${attendee.firstName || `Guest ${ai}`}`}
              </h2>
              {attendeeQuestions.map((q) => {
                const key = `${q.questionId}:${attendee.attendeeId}`;
                return (
                  <QuestionField
                    key={key}
                    question={q}
                    answerKey={key}
                    value={formData.questionAnswers[key] || ''}
                    onChange={(val) => setQuestionAnswer(key, val)}
                    error={errors[key]}
                  />
                );
              })}
            </div>
          );
        })}

      <GovButton type="submit">Continue</GovButton>
    </form>
  );
}

function QuestionField({
  question,
  answerKey,
  value,
  onChange,
  error,
}: {
  question: EventQuestion;
  answerKey: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const q = question;

  switch (q.questionType) {
    case 'text':
      return (
        <GovInput
          id={answerKey}
          name={answerKey}
          label={q.questionText}
          hint={q.helpText || undefined}
          value={value}
          onChange={onChange}
          error={error}
        />
      );

    case 'textarea':
      return (
        <GovTextarea
          id={answerKey}
          name={answerKey}
          label={q.questionText}
          hint={q.helpText || undefined}
          value={value}
          onChange={onChange}
          error={error}
        />
      );

    case 'yesNo':
      return (
        <GovRadioGroup
          id={answerKey}
          name={answerKey}
          legend={q.questionText}
          legendSize="m"
          hint={q.helpText || undefined}
          value={value}
          onChange={onChange}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          error={error}
          inline
        />
      );

    case 'radio':
      return (
        <GovRadioGroup
          id={answerKey}
          name={answerKey}
          legend={q.questionText}
          legendSize="m"
          hint={q.helpText || undefined}
          value={value}
          onChange={onChange}
          options={q.options.map((o) => ({ value: o, label: o }))}
          error={error}
        />
      );

    case 'select':
      return (
        <GovSelect
          id={answerKey}
          name={answerKey}
          label={q.questionText}
          hint={q.helpText || undefined}
          value={value}
          onChange={onChange}
          options={q.options.map((o) => ({ value: o, label: o }))}
          error={error}
        />
      );

    case 'multiSelect':
    case 'checkbox': {
      const selected: string[] = value ? (JSON.parse(value) as string[]) : [];
      return (
        <GovCheckboxGroup
          id={answerKey}
          name={answerKey}
          legend={q.questionText}
          values={selected}
          onChange={(vals) => onChange(JSON.stringify(vals))}
          options={q.options.map((o) => ({ value: o, label: o }))}
          hint={q.helpText || undefined}
          error={error}
        />
      );
    }

    default:
      return null;
  }
}
