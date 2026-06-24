import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RsvpTokenWrapper } from '@/pages/rsvp/RsvpTokenWrapper';
import { AttendancePage } from '@/pages/rsvp/AttendancePage';
import { GuestsPage } from '@/pages/rsvp/GuestsPage';
import { DietaryPage } from '@/pages/rsvp/DietaryPage';
import { AccessibilityPage } from '@/pages/rsvp/AccessibilityPage';
import { QuestionsPage } from '@/pages/rsvp/QuestionsPage';
import { ContactPage } from '@/pages/rsvp/ContactPage';
import { ReviewPage } from '@/pages/rsvp/ReviewPage';
import { ConfirmationPage } from '@/pages/rsvp/ConfirmationPage';
import { RsvpEntryPage } from '@/pages/rsvp/RsvpEntryPage';
import { InvalidPage } from '@/pages/InvalidPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Invalid token page */}
        <Route path="/invalid" element={<InvalidPage />} />

        {/* RSVP token subtree — all pages share the token provider */}
        <Route path="/rsvp/:token" element={<RsvpTokenWrapper />}>
          <Route index element={<RsvpEntryPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="guests" element={<GuestsPage />} />
          <Route path="dietary" element={<DietaryPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="confirmation" element={<ConfirmationPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/invalid" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
