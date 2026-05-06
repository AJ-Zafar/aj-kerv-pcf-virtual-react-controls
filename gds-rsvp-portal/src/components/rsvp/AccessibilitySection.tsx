'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovTextarea } from '@/components/gov/GovTextarea';
import { GovButton } from '@/components/gov/GovButton';
import { GovErrorSummary } from '@/components/gov/GovErrorSummary';

interface Props {
  onContinue: () => void;
}

export function AccessibilitySection({ onContinue }: Props) {
  const {
    formData,
    errors,
    updatePrimaryAttendee,
    updateGuest,
    validateCurrentStep,
    clearErrors,
  } = useRsvp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validateCurrentStep('accessibility')) {
      onContinue();
    }
  };

  const allAttendees = [formData.primaryAttendee, ...formData.guests];
  const errorItems = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GovErrorSummary errors={errorItems} />

      <h1 className="govuk-heading-l">Accessibility needs</h1>
      <p className="govuk-body">
        Let us know if you or your guests have any accessibility requirements so
        we can make appropriate arrangements.
      </p>

      {allAttendees.map((attendee, i) => {
        const isPrimary = i === 0;
        const label = isPrimary
          ? `${attendee.firstName || 'You'} (primary attendee)`
          : `${attendee.firstName || `Guest ${i}`}`;

        const update = (field: string, value: string) => {
          if (isPrimary) {
            updatePrimaryAttendee(field as any, value);
          } else {
            updateGuest(i - 1, field as any, value);
          }
        };

        return (
          <div key={attendee.attendeeId} className="govuk-!-margin-bottom-6">
            <h2 className="govuk-heading-m">{label}</h2>
            <GovTextarea
              id={`accessibility-${i}`}
              name={`accessibility-${i}`}
              label="Accessibility requirements"
              hint="For example, wheelchair access, hearing loop, sign language interpreter"
              value={attendee.accessibilityRequirement}
              onChange={(val) => update('accessibilityRequirement', val)}
              rows={3}
              maxLength={500}
            />
          </div>
        );
      })}

      <GovButton type="submit">Continue</GovButton>
    </form>
  );
}
