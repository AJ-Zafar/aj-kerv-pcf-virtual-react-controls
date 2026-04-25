'use client';

import { StepPage } from '../StepPage';
import { AttendanceSection } from '@/components/rsvp/AttendanceSection';

export default function AttendancePage() {
  return (
    <StepPage step="attendance">
      {({ onContinue }) => <AttendanceSection onContinue={onContinue} />}
    </StepPage>
  );
}
