import { StepPage } from './StepPage';
import { AccessibilitySection } from '@/components/rsvp/AccessibilitySection';

export function AccessibilityPage() {
  return (
    <StepPage step="accessibility">
      {({ onContinue }) => <AccessibilitySection onContinue={onContinue} />}
    </StepPage>
  );
}
