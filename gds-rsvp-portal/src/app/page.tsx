import { GovPageLayout } from '@/components/gov/GovPageLayout';
import { getAllTokens } from '@/mock/mockData';
import Link from 'next/link';

const SCENARIO_DESCRIPTIONS: Record<string, string> = {
  'scenario-01': 'Standard invite - no guests allowed',
  'scenario-02': 'Invite with one plus-one',
  'scenario-03': 'Invite with up to 4 guests',
  'scenario-04': 'Dietary and accessibility requirements enabled',
  'scenario-05': 'Custom questions at RSVP level',
  'scenario-06': 'Custom questions per attendee',
  'scenario-07': 'Already responded - can edit',
  'scenario-08': 'Already responded - cannot edit',
  'scenario-09': 'RSVP deadline has passed',
  'scenario-10': 'Event full - waitlist enabled',
  'scenario-11': 'Event full - waitlist disabled',
  'scenario-12': 'Event requires approval',
  'scenario-13': 'User declines the invite',
  'scenario-15': 'Event cancelled',
};

export default function HomePage() {
  const tokens = getAllTokens();

  return (
    <GovPageLayout serviceName="RSVP Portal">
      <h1 className="govuk-heading-xl">RSVP Portal - Prototype</h1>

      <p className="govuk-body-l">
        Select a scenario below to test the RSVP journey with different
        configurations and states.
      </p>

      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th className="govuk-table__header" scope="col">Scenario</th>
            <th className="govuk-table__header" scope="col">Description</th>
            <th className="govuk-table__header" scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {tokens.map((token) => (
            <tr className="govuk-table__row" key={token}>
              <td className="govuk-table__cell">{token}</td>
              <td className="govuk-table__cell">
                {SCENARIO_DESCRIPTIONS[token] || 'Custom scenario'}
              </td>
              <td className="govuk-table__cell">
                <Link href={`/rsvp/${token}/`} className="govuk-link">
                  Open RSVP
                </Link>
              </td>
            </tr>
          ))}
          {/* Invalid token scenario */}
          <tr className="govuk-table__row">
            <td className="govuk-table__cell">scenario-14</td>
            <td className="govuk-table__cell">
              Invalid or expired invitation token
            </td>
            <td className="govuk-table__cell">
              <Link href="/rsvp/scenario-14/" className="govuk-link">
                Open RSVP
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </GovPageLayout>
  );
}
