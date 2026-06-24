import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRsvp } from '@/context/RsvpContext';
import { ConfirmationPanel } from '@/components/rsvp/ConfirmationPanel';
import { GovBackLink } from '@/components/gov/GovBackLink';

export function ConfirmationPage() {
  const { token } = useParams<{ token: string }>();
  const baseUrl = `/rsvp/${token}`;
  const { submitted, rsvpState } = useRsvp();

  useEffect(() => {
    document.title = 'Confirmation - RSVP';
  }, []);

  if (
    !submitted &&
    rsvpState !== 'alreadyRespondedReadOnly' &&
    rsvpState !== 'alreadyRespondedEditable'
  ) {
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
