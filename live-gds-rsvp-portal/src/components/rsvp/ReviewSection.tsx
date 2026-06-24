import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovSummaryList } from '@/components/gov/GovSummaryList';
import { GovButton } from '@/components/gov/GovButton';
import { STEP_LABELS } from '@/lib/businessRules';
import { StepSlug } from '@/types/dataverse';

interface Props {
  baseUrl: string;
  onSubmit: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

export function ReviewSection({ baseUrl, onSubmit, submitting, submitError }: Props) {
  const { formData, scenario, steps } = useRsvp();

  const changeLink = (step: StepSlug) => `${baseUrl}/${step}`;

  const rows: { key: string; value: React.ReactNode; action?: { href: string; label: string } }[] = [];

  const statusLabel: Record<string, string> = {
    attending: 'Yes, attending',
    declined: 'Not attending',
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

  const p = formData.primaryAttendee;
  rows.push({
    key: 'Your name',
    value: `${p.firstName} ${p.lastName}`,
    action: steps.includes('contact') ? { href: changeLink('contact'), label: 'Change' } : undefined,
  });
  rows.push({ key: 'Your email', value: p.email });

  if (formData.guests.length > 0 && steps.includes('guests')) {
    formData.guests.forEach((g, i) => {
      rows.push({
        key: `Guest ${i + 1}`,
        value: `${g.firstName} ${g.lastName}${g.email ? ` (${g.email})` : ''}`,
        action: { href: changeLink('guests'), label: 'Change' },
      });
    });
  }

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

  // Suppress unused variable warning
  void STEP_LABELS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="govuk-heading-l">Check your answers before submitting</h1>

      <GovSummaryList rows={rows} />

      {submitError && (
        <p className="govuk-error-message govuk-!-margin-top-4">
          <span className="govuk-visually-hidden">Error:</span> {submitError}
        </p>
      )}

      <GovButton type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit RSVP'}
      </GovButton>
    </form>
  );
}
