'use client';

import { StepPage } from '../StepPage';
import { ContactDetailsSection } from '@/components/rsvp/ContactDetailsSection';

export default function ContactPage() {
  return (
    <StepPage step="contact">
      {({ onContinue }) => <ContactDetailsSection onContinue={onContinue} />}
    </StepPage>
  );
}
