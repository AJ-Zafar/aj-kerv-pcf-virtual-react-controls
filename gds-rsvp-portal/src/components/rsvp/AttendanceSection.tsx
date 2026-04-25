'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import {
  GovRadioGroup,
  GovTextarea,
  GovErrorSummary,
  GovButton,
  GovInsetText,
  GovNotificationBanner,
} from '@/components/gov';
import { isReadOnly } from '@/lib/businessRules';

interface Props {
  onContinue: () => void;
}

export function AttendanceSection({ onContinue }: Props) {
  const {
    formData,
    errors,
    rsvpState,
    scenario,
    setAttendanceStatus,
    setDeclinedReason,
    validateCurrentStep,
    clearErrors,
  } = useRsvp();

  const readOnly = isReadOnly(rsvpState);
  const isFullWaitlist = rsvpState === 'fullWaitlist';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validateCurrentStep('attendance')) {
      onContinue();
    }
  };

  const errorItems = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  const attendanceOptions = [
    { value: 'attending', label: isFullWaitlist ? 'Join the waitlist' : 'Yes, I will attend' },
    { value: 'declined', label: 'No, I cannot attend' },
    { value: 'maybe', label: 'Maybe — I am not sure yet' },
  ];

  if (scenario.event.approvalRequired) {
    attendanceOptions[0] = {
      value: 'pendingApproval',
      label: 'Yes, I would like to attend (subject to approval)',
    };
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GovErrorSummary errors={errorItems} />

      {isFullWaitlist && (
        <GovNotificationBanner type="info" title="Important">
          <p className="govuk-body">
            This event is currently full. You can join the waitlist and we will
            notify you if a space becomes available.
          </p>
        </GovNotificationBanner>
      )}

      <GovRadioGroup
        id="attendanceStatus"
        name="attendanceStatus"
        legend="Will you be attending this event?"
        legendSize="l"
        isPageHeading
        value={formData.attendanceStatus}
        onChange={(val) => setAttendanceStatus(val as any)}
        options={attendanceOptions}
        error={errors.attendanceStatus}
        disabled={readOnly}
      />

      {formData.attendanceStatus === 'declined' && (
        <GovTextarea
          id="declinedReason"
          name="declinedReason"
          label="Reason for not attending (optional)"
          value={formData.declinedReason}
          onChange={setDeclinedReason}
          rows={3}
          disabled={readOnly}
        />
      )}

      {!readOnly && (
        <GovButton type="submit">Continue</GovButton>
      )}
    </form>
  );
}
