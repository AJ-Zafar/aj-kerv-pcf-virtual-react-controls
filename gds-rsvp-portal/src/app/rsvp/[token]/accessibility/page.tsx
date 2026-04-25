'use client';

import { StepPage } from '../StepPage';
import { AccessibilitySection } from '@/components/rsvp/AccessibilitySection';

export default function AccessibilityPage() {
  return (
    <StepPage step="accessibility">
      {({ onContinue }) => <AccessibilitySection onContinue={onContinue} />}
    </StepPage>
  );
}
