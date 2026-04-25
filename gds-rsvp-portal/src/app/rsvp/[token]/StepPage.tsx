'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useRsvp } from '@/context/RsvpContext';
import { GovBackLink } from '@/components/gov';
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
  const { steps } = useRsvp();
  const baseUrl = `/rsvp/${token}`;

  const prev = getPrevStep(step, steps);
  const stepNum = getStepNumber(step, steps);
  const totalSteps = steps.length;

  const handleContinue = () => {
    const next = getNextStep(step, steps);
    if (next) {
      router.push(`${baseUrl}/${next}/`);
    }
  };

  return (
    <div>
      {prev && (
        <GovBackLink href={`${baseUrl}/${prev}/`} />
      )}
      {totalSteps > 1 && (
        <p className="govuk-caption-l">
          Step {stepNum} of {totalSteps}
        </p>
      )}
      {children({ onContinue: handleContinue, baseUrl })}
    </div>
  );
}
