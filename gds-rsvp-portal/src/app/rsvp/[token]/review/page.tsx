'use client';

import { useRouter, useParams } from 'next/navigation';
import { useRsvp } from '@/context/RsvpContext';
import { StepPage } from '../StepPage';
import { ReviewSection } from '@/components/rsvp/ReviewSection';

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { submitRsvp } = useRsvp();

  const handleSubmit = () => {
    // Future: POST to Dataverse / Azure Function API here
    submitRsvp();
    router.push(`/rsvp/${token}/confirmation/`);
  };

  return (
    <StepPage step="review">
      {({ baseUrl }) => (
        <ReviewSection baseUrl={baseUrl} onSubmit={handleSubmit} />
      )}
    </StepPage>
  );
}
