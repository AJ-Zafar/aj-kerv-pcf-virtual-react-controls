'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useRsvp } from '@/context/RsvpContext';
import { GovBackLink } from '@/components/gov/GovBackLink';
import { getNextStep, getPrevStep, getStepNumber, STEP_LABELS } from '@/lib/businessRules';
import { StepSlug } from '@/types/dataverse';

interface Props {
  step: StepSlug;
  children: (props: {
    onContinue: () => void;
    baseUrl: string;
  }) => React.ReactNode;
}

export function StepPage({ step, children }: Props) {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { steps, errors } = useRsvp();
  const baseUrl = `/rsvp/${token}`;
  const headingRef = useRef<HTMLParagraphElement>(null);

  const prev = getPrevStep(step, steps);
  const stepNum = getStepNumber(step, steps);
  const totalSteps = steps.length;
  const stepLabel = STEP_LABELS[step];
  const hasErrors = Object.keys(errors).length > 0;

  // Dynamic page title with "Error:" prefix when validation fails
  useEffect(() => {
    const prefix = hasErrors ? 'Error: ' : '';
    document.title = `${prefix}${stepLabel} - Step ${stepNum} of ${totalSteps} - RSVP`;
  }, [stepLabel, stepNum, totalSteps, hasErrors]);

  // Focus management on SPA navigation — move focus to top of step
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [step]);

  const handleContinue = () => {
    const next = getNextStep(step, steps);
    if (next) {
      router.push(`${baseUrl}/${next}/`);
    }
  };

  const nextStep = getNextStep(step, steps);
  const backLinkEl = prev ? <GovBackLink href={`${baseUrl}/${prev}/`} /> : null;

  return (
    <div>
      {nextStep && (
        <Link href={`${baseUrl}/${nextStep}/`} prefetch className="govuk-visually-hidden" tabIndex={-1} aria-hidden="true">.</Link>
      )}
      {backLinkEl}
      {totalSteps > 1 && (
        <p className="govuk-caption-l" ref={headingRef} tabIndex={-1}>
          <span className="govuk-visually-hidden">Section: </span>
          {stepLabel} - Step {stepNum} of {totalSteps}
        </p>
      )}
      {children({ onContinue: handleContinue, baseUrl })}
    </div>
  );
}
