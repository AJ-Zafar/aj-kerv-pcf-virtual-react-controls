'use client';

import { StepPage } from '../StepPage';
import { GuestSection } from '@/components/rsvp/GuestSection';

export default function GuestsPage() {
  return (
    <StepPage step="guests">
      {({ onContinue }) => <GuestSection onContinue={onContinue} />}
    </StepPage>
  );
}
