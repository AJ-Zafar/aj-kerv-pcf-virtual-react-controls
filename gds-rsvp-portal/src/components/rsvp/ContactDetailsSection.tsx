'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovInput } from '@/components/gov/GovInput';
import { GovButton } from '@/components/gov/GovButton';
import { GovErrorSummary } from '@/components/gov/GovErrorSummary';
import { GovInsetText } from '@/components/gov/GovInsetText';

interface Props {
  onContinue: () => void;
}

export function ContactDetailsSection({ onContinue }: Props) {
  const {
    formData,
    errors,
    scenario,
    updatePrimaryAttendee,
    validateCurrentStep,
    clearErrors,
  } = useRsvp();

  const editable = scenario.invitation.allowInviteeToEditContactDetails;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validateCurrentStep('contact')) {
      onContinue();
    }
  };

  const errorItems = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  const p = formData.primaryAttendee;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GovErrorSummary errors={errorItems} />

      <h1 className="govuk-heading-l">Your contact details</h1>

      {!editable && (
        <GovInsetText>
          Your contact details are pre-filled from your invitation and cannot be
          changed. Contact the organiser if you need to update them.
        </GovInsetText>
      )}

      <GovInput
        id="primary-firstName"
        name="firstName"
        label="First name"
        value={p.firstName}
        onChange={(val) => updatePrimaryAttendee('firstName', val)}
        error={errors['primary-firstName']}
        disabled={!editable}
        autoComplete="given-name"
      />

      <GovInput
        id="primary-lastName"
        name="lastName"
        label="Last name"
        value={p.lastName}
        onChange={(val) => updatePrimaryAttendee('lastName', val)}
        error={errors['primary-lastName']}
        disabled={!editable}
        autoComplete="family-name"
      />

      <GovInput
        id="primary-email"
        name="email"
        label="Email address"
        type="email"
        value={p.email}
        onChange={(val) => updatePrimaryAttendee('email', val)}
        error={errors['primary-email']}
        disabled={!editable}
        autoComplete="email"
      />

      <GovButton type="submit">Continue</GovButton>
    </form>
  );
}
