import { useNavigate, useParams } from 'react-router-dom';
import { useRsvp } from '@/context/RsvpContext';
import { StepPage } from './StepPage';
import { ReviewSection } from '@/components/rsvp/ReviewSection';

export function ReviewPage() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { submitRsvp, submitting, submitError } = useRsvp();

  const handleSubmit = async () => {
    try {
      await submitRsvp();
      navigate(`/rsvp/${token}/confirmation`);
    } catch {
      // submitError is already set in context; page will re-render with the error
    }
  };

  return (
    <StepPage step="review">
      {({ baseUrl }) => (
        <ReviewSection
          baseUrl={baseUrl}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        />
      )}
    </StepPage>
  );
}
