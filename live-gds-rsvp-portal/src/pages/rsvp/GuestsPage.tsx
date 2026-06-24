import { StepPage } from './StepPage';
import { GuestSection } from '@/components/rsvp/GuestSection';

export function GuestsPage() {
  return (
    <StepPage step="guests">
      {({ onContinue }) => <GuestSection onContinue={onContinue} />}
    </StepPage>
  );
}
