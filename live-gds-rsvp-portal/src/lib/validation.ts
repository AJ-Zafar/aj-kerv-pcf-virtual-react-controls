import {
  RsvpFormData,
  GdsInvitation,
  EventQuestion,
  StepSlug,
} from '@/types/dataverse';

export type ErrorMap = Record<string, string>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAttendance(formData: RsvpFormData): ErrorMap {
  const errors: ErrorMap = {};
  if (!formData.attendanceStatus) {
    errors.attendanceStatus = 'Select whether you will be attending';
  }
  return errors;
}

export function validateGuests(
  formData: RsvpFormData,
  invitation: GdsInvitation
): ErrorMap {
  const errors: ErrorMap = {};

  if (formData.guests.length > invitation.maxGuestsAllowed) {
    errors.guestCount = `You can add a maximum of ${invitation.maxGuestsAllowed} guest${invitation.maxGuestsAllowed === 1 ? '' : 's'}`;
  }

  formData.guests.forEach((g, i) => {
    if (!g.firstName.trim()) {
      errors[`guest-${i}-firstName`] = `Enter first name for guest ${i + 1}`;
    }
    if (!g.lastName.trim()) {
      errors[`guest-${i}-lastName`] = `Enter last name for guest ${i + 1}`;
    }
    if (invitation.guestEmailRequired && !g.email.trim()) {
      errors[`guest-${i}-email`] = `Enter email address for guest ${i + 1}`;
    } else if (invitation.guestEmailRequired && g.email.trim() && !EMAIL_REGEX.test(g.email.trim())) {
      errors[`guest-${i}-email`] = `Enter an email address in the correct format, like name@example.com`;
    }
  });

  return errors;
}

export function validateDietary(formData: RsvpFormData): ErrorMap {
  const errors: ErrorMap = {};
  const allAttendees = [formData.primaryAttendee, ...formData.guests];
  allAttendees.forEach((a, i) => {
    if (a.dietaryRequirement === 'Other' && !a.dietaryRequirementOther.trim()) {
      errors[`dietary-${i}-other`] = `Enter dietary requirement details for ${a.firstName || `attendee ${i + 1}`}`;
    }
  });
  return errors;
}

export function validateAccessibility(formData: RsvpFormData): ErrorMap {
  const errors: ErrorMap = {};
  const allAttendees = [formData.primaryAttendee, ...formData.guests];
  allAttendees.forEach((a, i) => {
    if (
      a.accessibilityRequirement === 'Other' &&
      !a.accessibilityRequirementOther.trim()
    ) {
      errors[`accessibility-${i}-other`] = `Enter accessibility requirement details for ${a.firstName || `attendee ${i + 1}`}`;
    }
  });
  return errors;
}

export function validateQuestions(
  formData: RsvpFormData,
  questions: EventQuestion[]
): ErrorMap {
  const errors: ErrorMap = {};

  questions.forEach((q) => {
    if (!q.required) return;

    if (q.appliesTo === 'rsvp' || q.appliesTo === 'primaryAttendee') {
      const val = formData.questionAnswers[q.questionId];
      if (!val || !val.trim()) {
        errors[q.questionId] = `Answer "${q.questionText}"`;
      }
    }

    if (q.appliesTo === 'allAttendees' || q.appliesTo === 'guestsOnly') {
      const attendees =
        q.appliesTo === 'allAttendees'
          ? [formData.primaryAttendee, ...formData.guests]
          : formData.guests;

      attendees.forEach((a) => {
        const key = `${q.questionId}:${a.attendeeId}`;
        const val = formData.questionAnswers[key];
        if (!val || !val.trim()) {
          errors[key] = `Answer "${q.questionText}" for ${a.firstName || 'this attendee'}`;
        }
      });
    }
  });

  return errors;
}

export function validateContact(formData: RsvpFormData): ErrorMap {
  const errors: ErrorMap = {};
  const p = formData.primaryAttendee;

  if (!p.firstName.trim()) {
    errors['primary-firstName'] = 'Enter your first name';
  }
  if (!p.lastName.trim()) {
    errors['primary-lastName'] = 'Enter your last name';
  }
  if (!p.email.trim()) {
    errors['primary-email'] = 'Enter your email address';
  } else if (!EMAIL_REGEX.test(p.email.trim())) {
    errors['primary-email'] = 'Enter an email address in the correct format, like name@example.com';
  }

  return errors;
}

export function validateStep(
  step: StepSlug,
  formData: RsvpFormData,
  invitation: GdsInvitation,
  questions: EventQuestion[]
): ErrorMap {
  switch (step) {
    case 'attendance':
      return validateAttendance(formData);
    case 'guests':
      return validateGuests(formData, invitation);
    case 'dietary':
      return validateDietary(formData);
    case 'accessibility':
      return validateAccessibility(formData);
    case 'questions':
      return validateQuestions(formData, questions);
    case 'contact':
      return validateContact(formData);
    default:
      return {};
  }
}
