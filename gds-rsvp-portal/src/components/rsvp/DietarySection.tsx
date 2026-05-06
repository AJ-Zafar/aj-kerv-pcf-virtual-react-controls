'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovSelect } from '@/components/gov/GovSelect';
import { GovInput } from '@/components/gov/GovInput';
import { GovButton } from '@/components/gov/GovButton';
import { GovErrorSummary } from '@/components/gov/GovErrorSummary';

const DIETARY_OPTIONS = [
  { value: '', label: 'Select dietary requirement' },
  { value: 'None', label: 'None' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Halal', label: 'Halal' },
  { value: 'Kosher', label: 'Kosher' },
  { value: 'Gluten-free', label: 'Gluten-free' },
  { value: 'Dairy-free', label: 'Dairy-free' },
  { value: 'Other', label: 'Other' },
];

interface Props {
  onContinue: () => void;
}

export function DietarySection({ onContinue }: Props) {
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
    if (validateCurrentStep('dietary')) {
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

      <h1 className="govuk-heading-l">Dietary requirements</h1>
      <p className="govuk-body">
        Let us know if you or your guests have any dietary requirements.
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
            <GovSelect
              id={`dietary-${i}`}
              name={`dietary-${i}`}
              label="Dietary requirement"
              value={attendee.dietaryRequirement}
              onChange={(val) => update('dietaryRequirement', val)}
              options={DIETARY_OPTIONS}
            />
            {attendee.dietaryRequirement === 'Other' && (
              <GovInput
                id={`dietary-${i}-other`}
                name={`dietary-${i}-other`}
                label="Please specify"
                value={attendee.dietaryRequirementOther}
                onChange={(val) => update('dietaryRequirementOther', val)}
                error={errors[`dietary-${i}-other`]}
              />
            )}
          </div>
        );
      })}

      <GovButton type="submit">Continue</GovButton>
    </form>
  );
}
