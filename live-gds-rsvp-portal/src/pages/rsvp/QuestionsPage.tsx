import { StepPage } from './StepPage';
import { CustomQuestionsSection } from '@/components/rsvp/CustomQuestionsSection';

export function QuestionsPage() {
  return (
    <StepPage step="questions">
      {({ onContinue }) => <CustomQuestionsSection onContinue={onContinue} />}
    </StepPage>
  );
}
