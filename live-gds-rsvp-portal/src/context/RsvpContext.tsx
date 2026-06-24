import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import {
  ScenarioData,
  RsvpFormData,
  AttendeeFormData,
  RsvpState,
  StepSlug,
  AttendanceStatus,
  SubmitRsvpRequest,
} from '@/types/dataverse';
import { getRsvpState, getJourneySteps } from '@/lib/businessRules';
import { validateStep, ErrorMap } from '@/lib/validation';

function makeEmptyAttendeeForm(id: string, type: 'primary' | 'guest'): AttendeeFormData {
  return {
    attendeeId: id,
    attendeeType: type,
    firstName: '',
    lastName: '',
    email: '',
    dietaryRequirement: '',
    dietaryRequirementOther: '',
    accessibilityRequirement: '',
    accessibilityRequirementOther: '',
  };
}

function attendeeToForm(a: ScenarioData['attendees'][0]): AttendeeFormData {
  return {
    attendeeId: a.attendeeId,
    attendeeType: a.attendeeType,
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    dietaryRequirement: a.dietaryRequirement,
    dietaryRequirementOther: a.dietaryRequirementOther,
    accessibilityRequirement: a.accessibilityRequirement,
    accessibilityRequirementOther: a.accessibilityRequirementOther,
  };
}

let guestIdCounter = 100;

interface RsvpContextValue {
  scenario: ScenarioData;
  rsvpState: RsvpState;
  formData: RsvpFormData;
  errors: ErrorMap;
  steps: StepSlug[];
  submitted: boolean;
  submitting: boolean;
  submitError: string | null;

  setAttendanceStatus: (status: AttendanceStatus | '') => void;
  setDeclinedReason: (reason: string) => void;
  updatePrimaryAttendee: (field: keyof AttendeeFormData, value: string) => void;
  addGuest: () => void;
  removeGuest: (index: number) => void;
  updateGuest: (index: number, field: keyof AttendeeFormData, value: string) => void;
  setQuestionAnswer: (key: string, value: string) => void;
  validateCurrentStep: (step: StepSlug) => boolean;
  clearErrors: () => void;
  submitRsvp: () => Promise<void>;
}

const RsvpContext = createContext<RsvpContextValue | null>(null);

export function RsvpProvider({
  scenario,
  children,
}: {
  scenario: ScenarioData;
  children: React.ReactNode;
}) {
  const rsvpState = useMemo(
    () => getRsvpState(scenario.event, scenario.invitation, scenario.response),
    [scenario]
  );

  const [formData, setFormData] = useState<RsvpFormData>(() => {
    const primary = scenario.attendees.find((a) => a.attendeeType === 'primary');
    const guests = scenario.attendees.filter((a) => a.attendeeType === 'guest');

    const answers: Record<string, string> = {};
    scenario.answers.forEach((a) => {
      const key = a.attendeeId ? `${a.questionId}:${a.attendeeId}` : a.questionId;
      answers[key] = a.value;
    });

    return {
      attendanceStatus:
        scenario.response.attendanceStatus === 'notStarted'
          ? ''
          : scenario.response.attendanceStatus,
      declinedReason: scenario.response.declinedReason,
      primaryAttendee: primary
        ? attendeeToForm(primary)
        : makeEmptyAttendeeForm('att-primary', 'primary'),
      guests: guests.map(attendeeToForm),
      questionAnswers: answers,
    };
  });

  const [errors, setErrors] = useState<ErrorMap>({});
  const [submitted, setSubmitted] = useState(
    scenario.response.attendanceStatus !== 'notStarted' &&
      scenario.invitation.inviteStatus === 'responded'
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = useMemo(
    () =>
      getJourneySteps(
        scenario.event,
        scenario.invitation,
        formData,
        scenario.questions.length > 0
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scenario, formData.attendanceStatus]
  );

  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  const setAttendanceStatus = useCallback((status: AttendanceStatus | '') => {
    setFormData((prev) => ({ ...prev, attendanceStatus: status }));
  }, []);

  const setDeclinedReason = useCallback((reason: string) => {
    setFormData((prev) => ({ ...prev, declinedReason: reason }));
  }, []);

  const updatePrimaryAttendee = useCallback(
    (field: keyof AttendeeFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        primaryAttendee: { ...prev.primaryAttendee, [field]: value },
      }));
    },
    []
  );

  const addGuest = useCallback(() => {
    guestIdCounter++;
    setFormData((prev) => ({
      ...prev,
      guests: [
        ...prev.guests,
        makeEmptyAttendeeForm(`guest-${guestIdCounter}`, 'guest'),
      ],
    }));
  }, []);

  const removeGuest = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.filter((_, i) => i !== index),
    }));
  }, []);

  const updateGuest = useCallback(
    (index: number, field: keyof AttendeeFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        guests: prev.guests.map((g, i) =>
          i === index ? { ...g, [field]: value } : g
        ),
      }));
    },
    []
  );

  const setQuestionAnswer = useCallback((key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questionAnswers: { ...prev.questionAnswers, [key]: value },
    }));
  }, []);

  const validateCurrentStep = useCallback(
    (step: StepSlug): boolean => {
      const stepErrors = validateStep(
        step,
        formDataRef.current,
        scenario.invitation,
        scenario.questions
      );
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    },
    [scenario]
  );

  const clearErrors = useCallback(() => setErrors({}), []);

  const submitRsvp = useCallback(async () => {
    const current = formDataRef.current;
    const token = scenario.invitation.inviteToken;

    const body: SubmitRsvpRequest = {
      token,
      attendanceStatus: current.attendanceStatus as AttendanceStatus,
      declinedReason: current.declinedReason,
      primaryAttendee: current.primaryAttendee,
      guests: current.guests,
      questionAnswers: current.questionAnswers,
    };

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/rsvp/${token}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Submission failed (${res.status}): ${errText}`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred');
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [scenario]);

  const value = useMemo(
    () => ({
      scenario,
      rsvpState,
      formData,
      errors,
      steps,
      submitted,
      submitting,
      submitError,
      setAttendanceStatus,
      setDeclinedReason,
      updatePrimaryAttendee,
      addGuest,
      removeGuest,
      updateGuest,
      setQuestionAnswer,
      validateCurrentStep,
      clearErrors,
      submitRsvp,
    }),
    [
      scenario,
      rsvpState,
      formData,
      errors,
      steps,
      submitted,
      submitting,
      submitError,
      setAttendanceStatus,
      setDeclinedReason,
      updatePrimaryAttendee,
      addGuest,
      removeGuest,
      updateGuest,
      setQuestionAnswer,
      validateCurrentStep,
      clearErrors,
      submitRsvp,
    ]
  );

  return <RsvpContext.Provider value={value}>{children}</RsvpContext.Provider>;
}

export function useRsvp(): RsvpContextValue {
  const ctx = useContext(RsvpContext);
  if (!ctx) {
    throw new Error('useRsvp must be used within a RsvpProvider');
  }
  return ctx;
}
