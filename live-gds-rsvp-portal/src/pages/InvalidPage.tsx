import { Link } from 'react-router-dom';
import { GovPageLayout } from '@/components/gov/GovPageLayout';
import { GovInsetText } from '@/components/gov/GovInsetText';

export function InvalidPage() {
  return (
    <GovPageLayout serviceName="RSVP Portal">
      <h1 className="govuk-heading-xl">Invitation not found</h1>
      <GovInsetText>
        This invitation link is invalid or has expired. If you believe this is
        an error, please contact the event organiser.
      </GovInsetText>
      <p className="govuk-body">Common reasons for this:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>The link may have expired</li>
        <li>The invitation may have been withdrawn</li>
        <li>The link may be incomplete — check it was copied correctly</li>
      </ul>
      <p className="govuk-body">
        <Link to="/" className="govuk-link">
          Return to the home page
        </Link>
      </p>
    </GovPageLayout>
  );
}
