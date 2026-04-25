'use client';

import { StepPage } from '../StepPage';
import { CustomQuestionsSection } from '@/components/rsvp/CustomQuestionsSection';

export default function QuestionsPage() {
  return (
    <StepPage step="questions">
      {({ onContinue }) => <CustomQuestionsSection onContinue={onContinue} />}
    </StepPage>
  );
}
