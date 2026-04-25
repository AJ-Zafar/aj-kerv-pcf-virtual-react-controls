'use client';

import { StepPage } from '../StepPage';
import { DietarySection } from '@/components/rsvp/DietarySection';

export default function DietaryPage() {
  return (
    <StepPage step="dietary">
      {({ onContinue }) => <DietarySection onContinue={onContinue} />}
    </StepPage>
  );
}
