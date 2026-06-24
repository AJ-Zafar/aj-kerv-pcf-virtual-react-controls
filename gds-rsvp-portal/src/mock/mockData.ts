import {
  ScenarioData,
  GdsEvent,
  GdsInvitation,
  RsvpResponse,
  Attendee,
  EventQuestion,
} from '@/types/dataverse';

// ── Shared helpers ──

function futureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
}

function pastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

function makeAttendee(
  id: string,
  type: 'primary' | 'guest',
  first: string,
  last: string,
  email: string
): Attendee {
  return {
    attendeeId: id,
    attendeeType: type,
    firstName: first,
    lastName: last,
    email,
    dietaryRequirement: '',
    dietaryRequirementOther: '',
    accessibilityRequirement: '',
    accessibilityRequirementOther: '',
    qrCodeValue: `qr-${id}`,
    checkedIn: false,
  };
}

// ── Base event ──

const baseEvent: GdsEvent = {
  eventId: 'evt-001',
  name: 'GDS Annual Conference 2026',
  description:
    'Join us for the annual Government Digital Service conference featuring keynotes, workshops and networking.',
  startDateTime: '2026-10-22T09:30:00.000Z',
  endDateTime: '2026-10-22T17:00:00.000Z',
  locationType: 'physical',
  locationName: 'QEII Centre',
  locationAddress: 'Broad Sanctuary, London SW1P 3EE',
  virtualJoinUrl: '',
  organiserName: 'GDS Events Team',
  rsvpDeadline: '2026-10-15T23:59:00.000Z',
  eventStatus: 'open',
  capacity: 200,
  waitlistEnabled: false,
  qrCodeEnabled: true,
  editRsvpAllowed: true,
  dietaryRequirementsEnabled: false,
  accessibilityRequirementsEnabled: false,
  approvalRequired: false,
};

const baseInvitation: GdsInvitation = {
  invitationId: 'inv-001',
  eventId: 'evt-001',
  contactId: 'contact-001',
  inviteToken: '',
  inviteStatus: 'sent',
  maxGuestsAllowed: 0,
  guestEmailRequired: false,
  namedInviteOnly: false,
  allowInviteeToEditContactDetails: true,
  currentResponseId: null,
};

const baseResponse: RsvpResponse = {
  responseId: 'rsp-001',
  invitationId: 'inv-001',
  attendanceStatus: 'notStarted',
  submittedOn: null,
  declinedReason: '',
  canEdit: true,
  checkedIn: false,
};

const primaryAttendee = makeAttendee(
  'att-001',
  'primary',
  'Jane',
  'Smith',
  'jane.smith@example.gov.uk'
);

// ── Shared custom questions ──

const rsvpLevelQuestions: EventQuestion[] = [
  {
    questionId: 'q-01',
    questionText: 'How did you hear about this event?',
    helpText: '',
    questionType: 'select',
    required: true,
    displayOrder: 1,
    appliesTo: 'rsvp',
    options: ['Email invitation', 'Social media', 'Colleague referral', 'Website', 'Other'],
    conditionalVisibilityRule: null,
  },
  {
    questionId: 'q-02',
    questionText: 'Is there anything specific you would like covered in the sessions?',
    helpText: 'Optional — we will try to incorporate requests where possible.',
    questionType: 'textarea',
    required: false,
    displayOrder: 2,
    appliesTo: 'rsvp',
    options: [],
    conditionalVisibilityRule: null,
  },
];

const perAttendeeQuestions: EventQuestion[] = [
  {
    questionId: 'q-03',
    questionText: 'Which workshop session do you prefer?',
    helpText: 'Select the session you would like to attend.',
    questionType: 'radio',
    required: true,
    displayOrder: 1,
    appliesTo: 'allAttendees',
    options: ['Design systems', 'Accessibility testing', 'API strategy', 'Data ethics'],
    conditionalVisibilityRule: null,
  },
  {
    questionId: 'q-04',
    questionText: 'Do you require a parking space?',
    helpText: '',
    questionType: 'yesNo',
    required: true,
    displayOrder: 2,
    appliesTo: 'allAttendees',
    options: [],
    conditionalVisibilityRule: null,
  },
];

// ── Scenario builders ──

function scenario(
  token: string,
  overrides: {
    event?: Partial<GdsEvent>;
    invitation?: Partial<GdsInvitation>;
    response?: Partial<RsvpResponse>;
    attendees?: Attendee[];
    questions?: EventQuestion[];
  }
): ScenarioData {
  return {
    event: { ...baseEvent, ...overrides.event },
    invitation: {
      ...baseInvitation,
      inviteToken: token,
      ...overrides.invitation,
    },
    response: { ...baseResponse, ...overrides.response },
    attendees: overrides.attendees ?? [{ ...primaryAttendee }],
    questions: overrides.questions ?? [],
    answers: [],
  };
}

// ── All 15 scenarios ──

export const scenarios: Record<string, ScenarioData> = {
  // 1. Standard invite with no guests
  'scenario-01': scenario('scenario-01', {}),

  // 2. Invite with one plus one
  'scenario-02': scenario('scenario-02', {
    invitation: { maxGuestsAllowed: 1, guestEmailRequired: true },
  }),

  // 3. Invite with multiple guests
  'scenario-03': scenario('scenario-03', {
    invitation: { maxGuestsAllowed: 4, guestEmailRequired: true },
  }),

  // 4. Dietary and accessibility requirements enabled
  'scenario-04': scenario('scenario-04', {
    event: {
      dietaryRequirementsEnabled: true,
      accessibilityRequirementsEnabled: true,
    },
    invitation: { maxGuestsAllowed: 2 },
  }),

  // 5. Custom questions at RSVP level
  'scenario-05': scenario('scenario-05', {
    questions: rsvpLevelQuestions,
  }),

  // 6. Custom questions per attendee
  'scenario-06': scenario('scenario-06', {
    invitation: { maxGuestsAllowed: 2 },
    questions: perAttendeeQuestions,
  }),

  // 7. User has already responded and can edit
  'scenario-07': scenario('scenario-07', {
    invitation: { inviteStatus: 'responded', currentResponseId: 'rsp-001' },
    response: {
      attendanceStatus: 'attending',
      submittedOn: pastDate(5),
      canEdit: true,
    },
    attendees: [
      {
        ...primaryAttendee,
        dietaryRequirement: 'Vegetarian',
        dietaryRequirementOther: '',
      },
    ],
  }),

  // 8. User has already responded and cannot edit
  'scenario-08': scenario('scenario-08', {
    invitation: { inviteStatus: 'responded', currentResponseId: 'rsp-001' },
    response: {
      attendanceStatus: 'attending',
      submittedOn: pastDate(5),
      canEdit: false,
    },
  }),

  // 9. RSVP deadline has passed
  'scenario-09': scenario('scenario-09', {
    event: { rsvpDeadline: pastDate(2) },
  }),

  // 10. Event is full with waitlist enabled
  'scenario-10': scenario('scenario-10', {
    event: { eventStatus: 'full', waitlistEnabled: true },
  }),

  // 11. Event is full with waitlist disabled
  'scenario-11': scenario('scenario-11', {
    event: { eventStatus: 'full', waitlistEnabled: false },
  }),

  // 12. Event requires approval
  'scenario-12': scenario('scenario-12', {
    event: { approvalRequired: true },
  }),

  // 13. User declines the invite
  'scenario-13': scenario('scenario-13', {}),

  // 14. Invalid / expired invitation token — handled by absence from this map
  // The entry page will detect missing scenario and redirect to /invalid

  // 15. Event cancelled
  'scenario-15': scenario('scenario-15', {
    event: { eventStatus: 'cancelled' },
  }),
};

export function getScenario(token: string): ScenarioData | null {
  return scenarios[token] ?? null;
}

export function getAllTokens(): string[] {
  return Object.keys(scenarios);
}
