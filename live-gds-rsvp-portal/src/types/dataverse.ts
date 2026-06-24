// ── Enums / Union Types ──

export type LocationType = 'physical' | 'virtual' | 'hybrid';

export type EventStatus = 'draft' | 'open' | 'closed' | 'full' | 'cancelled';

export type InviteStatus = 'sent' | 'opened' | 'responded' | 'expired';

export type AttendanceStatus =
  | 'notStarted'
  | 'attending'
  | 'declined'
  | 'waitlisted'
  | 'pendingApproval';

export type AttendeeType = 'primary' | 'guest';

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'yesNo'
  | 'radio'
  | 'select'
  | 'multiSelect'
  | 'checkbox';

export type QuestionAppliesTo =
  | 'rsvp'
  | 'primaryAttendee'
  | 'allAttendees'
  | 'guestsOnly';

// ── Dataverse-style Entities ──

export interface GdsEvent {
  eventId: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  locationType: LocationType;
  locationName: string;
  locationAddress: string;
  virtualJoinUrl: string;
  organiserName: string;
  rsvpDeadline: string;
  eventStatus: EventStatus;
  capacity: number;
  waitlistEnabled: boolean;
  qrCodeEnabled: boolean;
  editRsvpAllowed: boolean;
  dietaryRequirementsEnabled: boolean;
  accessibilityRequirementsEnabled: boolean;
  approvalRequired: boolean;
}

export interface GdsInvitation {
  invitationId: string;
  eventId: string;
  contactId: string;
  inviteToken: string;
  inviteStatus: InviteStatus;
  maxGuestsAllowed: number;
  guestEmailRequired: boolean;
  namedInviteOnly: boolean;
  allowInviteeToEditContactDetails: boolean;
  currentResponseId: string | null;
}

export interface RsvpResponse {
  responseId: string;
  invitationId: string;
  attendanceStatus: AttendanceStatus;
  submittedOn: string | null;
  declinedReason: string;
  canEdit: boolean;
  checkedIn: boolean;
}

export interface Attendee {
  attendeeId: string;
  attendeeType: AttendeeType;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRequirement: string;
  dietaryRequirementOther: string;
  accessibilityRequirement: string;
  accessibilityRequirementOther: string;
  qrCodeValue: string;
  checkedIn: boolean;
}

export interface EventQuestion {
  questionId: string;
  questionText: string;
  helpText: string;
  questionType: QuestionType;
  required: boolean;
  displayOrder: number;
  appliesTo: QuestionAppliesTo;
  options: string[];
  conditionalVisibilityRule: string | null;
}

export interface QuestionAnswer {
  answerId: string;
  questionId: string;
  responseId: string;
  attendeeId: string | null;
  value: string;
}

// ── Aggregate scenario shape ──

export interface ScenarioData {
  event: GdsEvent;
  invitation: GdsInvitation;
  response: RsvpResponse;
  attendees: Attendee[];
  questions: EventQuestion[];
  answers: QuestionAnswer[];
}

// ── Form state (used by context) ──

export interface AttendeeFormData {
  attendeeId: string;
  attendeeType: AttendeeType;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRequirement: string;
  dietaryRequirementOther: string;
  accessibilityRequirement: string;
  accessibilityRequirementOther: string;
}

export interface RsvpFormData {
  attendanceStatus: AttendanceStatus | '';
  declinedReason: string;
  primaryAttendee: AttendeeFormData;
  guests: AttendeeFormData[];
  questionAnswers: Record<string, string>;
}

// ── Journey / UI state ──

export type RsvpState =
  | 'open'
  | 'alreadyRespondedEditable'
  | 'alreadyRespondedReadOnly'
  | 'expired'
  | 'closed'
  | 'full'
  | 'fullWaitlist'
  | 'cancelled'
  | 'invalid';

export type StepSlug =
  | 'attendance'
  | 'guests'
  | 'dietary'
  | 'accessibility'
  | 'questions'
  | 'contact'
  | 'review'
  | 'confirmation';

// ── API request / response types ──

export interface SubmitRsvpRequest {
  token: string;
  attendanceStatus: AttendanceStatus;
  declinedReason: string;
  primaryAttendee: AttendeeFormData;
  guests: AttendeeFormData[];
  questionAnswers: Record<string, string>;
}
