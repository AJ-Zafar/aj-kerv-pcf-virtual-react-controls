import {
  GdsEvent,
  GdsInvitation,
  RsvpResponse,
  RsvpState,
  StepSlug,
  RsvpFormData,
} from '@/types/dataverse';

export function getRsvpState(
  event: GdsEvent,
  invitation: GdsInvitation,
  response: RsvpResponse
): RsvpState {
  if (event.eventStatus === 'cancelled') return 'cancelled';
  if (event.eventStatus === 'closed') return 'closed';
  if (invitation.inviteStatus === 'expired') return 'expired';

  const deadlinePassed = new Date(event.rsvpDeadline) < new Date();
  if (deadlinePassed) return 'expired';

  if (event.eventStatus === 'full') {
    return event.waitlistEnabled ? 'fullWaitlist' : 'full';
  }

  if (
    response.attendanceStatus !== 'notStarted' &&
    invitation.inviteStatus === 'responded'
  ) {
    return response.canEdit ? 'alreadyRespondedEditable' : 'alreadyRespondedReadOnly';
  }

  return 'open';
}

export function isReadOnly(state: RsvpState): boolean {
  return (
    state === 'alreadyRespondedReadOnly' ||
    state === 'expired' ||
    state === 'closed' ||
    state === 'full' ||
    state === 'cancelled'
  );
}

export function canSubmit(state: RsvpState): boolean {
  return (
    state === 'open' ||
    state === 'fullWaitlist' ||
    state === 'alreadyRespondedEditable'
  );
}

export function getJourneySteps(
  event: GdsEvent,
  invitation: GdsInvitation,
  formData: RsvpFormData,
  hasQuestions: boolean
): StepSlug[] {
  const steps: StepSlug[] = ['attendance'];

  const isAttending =
    formData.attendanceStatus === 'attending' ||
    formData.attendanceStatus === 'waitlisted' ||
    formData.attendanceStatus === 'pendingApproval';

  if (!isAttending) {
    steps.push('review');
    return steps;
  }

  if (invitation.maxGuestsAllowed > 0) {
    steps.push('guests');
  }

  if (event.dietaryRequirementsEnabled) {
    steps.push('dietary');
  }

  if (event.accessibilityRequirementsEnabled) {
    steps.push('accessibility');
  }

  if (hasQuestions) {
    steps.push('questions');
  }

  steps.push('contact');
  steps.push('review');

  return steps;
}

export function getNextStep(current: StepSlug, steps: StepSlug[]): StepSlug | null {
  const idx = steps.indexOf(current);
  return idx >= 0 && idx < steps.length - 1 ? steps[idx + 1] : null;
}

export function getPrevStep(current: StepSlug, steps: StepSlug[]): StepSlug | null {
  const idx = steps.indexOf(current);
  return idx > 0 ? steps[idx - 1] : null;
}

export function getStepNumber(current: StepSlug, steps: StepSlug[]): number {
  return steps.indexOf(current) + 1;
}

export const STEP_LABELS: Record<StepSlug, string> = {
  attendance: 'Attendance',
  guests: 'Guest details',
  dietary: 'Dietary requirements',
  accessibility: 'Accessibility needs',
  questions: 'Additional questions',
  contact: 'Contact details',
  review: 'Review your answers',
  confirmation: 'Confirmation',
};
