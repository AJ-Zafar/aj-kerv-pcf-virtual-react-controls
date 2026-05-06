'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRsvp } from '@/context/RsvpContext';
import { ConfirmationPanel } from '@/components/rsvp/ConfirmationPanel';
import { GovBackLink } from '@/components/gov/GovBackLink';

export default function ConfirmationPage() {
  const params = useParams();
  const token = params.token as string;
  const baseUrl = `/rsvp/${token}`;
  const { submitted, rsvpState } = useRsvp();

  useEffect(() => {
    document.title = 'Confirmation - RSVP';
  }, []);

  // If the user navigates directly without submitting, show a message
  if (!submitted && rsvpState !== 'alreadyRespondedReadOnly' && rsvpState !== 'alreadyRespondedEditable') {
    return (
      <div>
        <GovBackLink href={`${baseUrl}/`} />
        <h1 className="govuk-heading-l">No response submitted</h1>
        <p className="govuk-body">
          You have not yet submitted your RSVP. Please go back and complete the form.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ConfirmationPanel baseUrl={baseUrl} />
    </div>
  );
}
