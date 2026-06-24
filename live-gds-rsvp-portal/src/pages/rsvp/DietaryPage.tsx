import { StepPage } from './StepPage';
import { DietarySection } from '@/components/rsvp/DietarySection';

export function DietaryPage() {
  return (
    <StepPage step="dietary">
      {({ onContinue }) => <DietarySection onContinue={onContinue} />}
    </StepPage>
  );
}
