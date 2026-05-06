'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovInput } from '@/components/gov/GovInput';
import { GovButton } from '@/components/gov/GovButton';
import { GovErrorSummary } from '@/components/gov/GovErrorSummary';
import { AttendeeFormData } from '@/types/dataverse';

interface Props {
  onContinue: () => void;
}

export function GuestSection({ onContinue }: Props) {
  const {
    formData,
    errors,
    scenario,
    addGuest,
    removeGuest,
    updateGuest,
    validateCurrentStep,
    clearErrors,
  } = useRsvp();

  const maxGuests = scenario.invitation.maxGuestsAllowed;
  const emailRequired = scenario.invitation.guestEmailRequired;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validateCurrentStep('guests')) {
      onContinue();
    }
  };

  const errorItems = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GovErrorSummary errors={errorItems} />

      <h1 className="govuk-heading-l">Guest details</h1>

      <p className="govuk-body">
        You can bring up to {maxGuests} guest{maxGuests !== 1 ? 's' : ''} to
        this event.
      </p>

      {errors.guestCount && (
        <p className="govuk-error-message">{errors.guestCount}</p>
      )}

      {formData.guests.map((guest, i) => (
        <div
          key={guest.attendeeId}
          className="govuk-summary-card govuk-!-margin-bottom-6"
        >
          <div className="govuk-summary-card__title-wrapper">
            <h2 className="govuk-summary-card__title">Guest {i + 1}</h2>
            <ul className="govuk-summary-card__actions">
              <li className="govuk-summary-card__action">
                <button
                  type="button"
                  className="govuk-link"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={() => removeGuest(i)}
                >
                  Remove<span className="govuk-visually-hidden"> guest {i + 1}</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="govuk-summary-card__content">
            <GovInput
              id={`guest-${i}-firstName`}
              name={`guest-${i}-firstName`}
              label="First name"
              value={guest.firstName}
              onChange={(val) => updateGuest(i, 'firstName', val)}
              error={errors[`guest-${i}-firstName`]}
            />
            <GovInput
              id={`guest-${i}-lastName`}
              name={`guest-${i}-lastName`}
              label="Last name"
              value={guest.lastName}
              onChange={(val) => updateGuest(i, 'lastName', val)}
              error={errors[`guest-${i}-lastName`]}
            />
            {emailRequired && (
              <GovInput
                id={`guest-${i}-email`}
                name={`guest-${i}-email`}
                label="Email address"
                type="email"
                value={guest.email}
                onChange={(val) => updateGuest(i, 'email', val)}
                error={errors[`guest-${i}-email`]}
                autoComplete="email"
              />
            )}
          </div>
        </div>
      ))}

      {formData.guests.length < maxGuests && (
        <GovButton
          type="button"
          variant="secondary"
          onClick={addGuest}
        >
          Add a guest
        </GovButton>
      )}

      <br />
      <GovButton type="submit">Continue</GovButton>
    </form>
  );
}
