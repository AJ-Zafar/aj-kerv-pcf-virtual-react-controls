import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRsvp } from '@/context/RsvpContext';
import { GovBackLink } from '@/components/gov/GovBackLink';
import { getNextStep, getPrevStep, getStepNumber, STEP_LABELS } from '@/lib/businessRules';
import { StepSlug } from '@/types/dataverse';

interface Props {
  step: StepSlug;
  children: (props: { onContinue: () => void; baseUrl: string }) => React.ReactNode;
}

export function StepPage({ step, children }: Props) {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { steps, errors } = useRsvp();
  const baseUrl = `/rsvp/${token}`;
  const headingRef = useRef<HTMLParagraphElement>(null);

  const prev = getPrevStep(step, steps);
  const stepNum = getStepNumber(step, steps);
  const totalSteps = steps.length;
  const stepLabel = STEP_LABELS[step];
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    const prefix = hasErrors ? 'Error: ' : '';
    document.title = `${prefix}${stepLabel} - Step ${stepNum} of ${totalSteps} - RSVP`;
  }, [stepLabel, stepNum, totalSteps, hasErrors]);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [step]);

  const handleContinue = () => {
    const next = getNextStep(step, steps);
    if (next) {
      navigate(`${baseUrl}/${next}`);
    }
  };

  const backLinkEl = prev ? <GovBackLink href={`${baseUrl}/${prev}`} /> : null;

  return (
    <div>
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
