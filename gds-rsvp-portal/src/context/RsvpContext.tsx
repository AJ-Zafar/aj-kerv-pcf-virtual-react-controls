'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  ScenarioData,
  RsvpFormData,
  AttendeeFormData,
  RsvpState,
  StepSlug,
  AttendanceStatus,
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

  setAttendanceStatus: (status: AttendanceStatus | '') => void;
  setDeclinedReason: (reason: string) => void;
  updatePrimaryAttendee: (field: keyof AttendeeFormData, value: string) => void;
  addGuest: () => void;
  removeGuest: (index: number) => void;
  updateGuest: (index: number, field: keyof AttendeeFormData, value: string) => void;
  setQuestionAnswer: (key: string, value: string) => void;
  validateCurrentStep: (step: StepSlug) => boolean;
  clearErrors: () => void;
  submitRsvp: () => void;
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

  const steps = useMemo(
    () =>
      getJourneySteps(
        scenario.event,
        scenario.invitation,
        formData,
        scenario.questions.length > 0
      ),
    [scenario, formData]
  );

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
        formData,
        scenario.invitation,
        scenario.questions
      );
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    },
    [formData, scenario]
  );

  const clearErrors = useCallback(() => setErrors({}), []);

  const submitRsvp = useCallback(() => {
    // Future: POST to Dataverse / Azure Function API
    setSubmitted(true);
  }, []);

  const value = useMemo(
    () => ({
      scenario,
      rsvpState,
      formData,
      errors,
      steps,
      submitted,
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
