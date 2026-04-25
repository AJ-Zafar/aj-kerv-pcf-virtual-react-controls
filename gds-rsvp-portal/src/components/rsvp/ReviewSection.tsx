'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovSummaryList, GovButton } from '@/components/gov';
import { STEP_LABELS } from '@/lib/businessRules';
import { StepSlug } from '@/types/dataverse';

interface Props {
  baseUrl: string;
  onSubmit: () => void;
}

export function ReviewSection({ baseUrl, onSubmit }: Props) {
  const { formData, scenario, steps } = useRsvp();

  const changeLink = (step: StepSlug) => `${baseUrl}/${step}/`;

  const rows: { key: string; value: React.ReactNode; action?: { href: string; label: string } }[] = [];

  // Attendance
  const statusLabel: Record<string, string> = {
    attending: 'Yes, attending',
    declined: 'Not attending',
    maybe: 'Maybe',
    waitlisted: 'Waitlisted',
    pendingApproval: 'Attending (pending approval)',
  };
  rows.push({
    key: 'Attendance',
    value: statusLabel[formData.attendanceStatus] || formData.attendanceStatus,
    action: { href: changeLink('attendance'), label: 'Change' },
  });

  if (formData.attendanceStatus === 'declined' && formData.declinedReason) {
    rows.push({ key: 'Reason', value: formData.declinedReason });
  }

  // Primary attendee
  const p = formData.primaryAttendee;
  rows.push({
    key: 'Your name',
    value: `${p.firstName} ${p.lastName}`,
    action: steps.includes('contact') ? { href: changeLink('contact'), label: 'Change' } : undefined,
  });
  rows.push({ key: 'Your email', value: p.email });

  // Guests
  if (formData.guests.length > 0 && steps.includes('guests')) {
    formData.guests.forEach((g, i) => {
      rows.push({
        key: `Guest ${i + 1}`,
        value: `${g.firstName} ${g.lastName}${g.email ? ` (${g.email})` : ''}`,
        action: { href: changeLink('guests'), label: 'Change' },
      });
    });
  }

  // Dietary
  if (steps.includes('dietary')) {
    const allAttendees = [formData.primaryAttendee, ...formData.guests];
    allAttendees.forEach((a) => {
      if (a.dietaryRequirement) {
        const val =
          a.dietaryRequirement === 'Other'
            ? `Other: ${a.dietaryRequirementOther}`
            : a.dietaryRequirement;
        rows.push({
          key: `Dietary (${a.firstName || 'Attendee'})`,
          value: val,
          action: { href: changeLink('dietary'), label: 'Change' },
        });
      }
    });
  }

  // Accessibility
  if (steps.includes('accessibility')) {
    const allAttendees = [formData.primaryAttendee, ...formData.guests];
    allAttendees.forEach((a) => {
      if (a.accessibilityRequirement) {
        rows.push({
          key: `Accessibility (${a.firstName || 'Attendee'})`,
          value: a.accessibilityRequirement,
          action: { href: changeLink('accessibility'), label: 'Change' },
        });
      }
    });
  }

  // Questions
  if (steps.includes('questions')) {
    scenario.questions.forEach((q) => {
      if (q.appliesTo === 'rsvp' || q.appliesTo === 'primaryAttendee') {
        const val = formData.questionAnswers[q.questionId];
        if (val) {
          rows.push({
            key: q.questionText,
            value: val,
            action: { href: changeLink('questions'), label: 'Change' },
          });
        }
      }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="govuk-heading-l">Check your answers before submitting</h1>

      <GovSummaryList rows={rows} />

      <GovButton type="submit">Submit RSVP</GovButton>
    </form>
  );
}
