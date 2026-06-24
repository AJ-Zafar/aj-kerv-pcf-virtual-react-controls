import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovPanel } from '@/components/gov/GovPanel';
import { GovSummaryList } from '@/components/gov/GovSummaryList';
import { GovInsetText } from '@/components/gov/GovInsetText';
import { GovButton } from '@/components/gov/GovButton';

const PlaceholderQrCode = React.memo(function PlaceholderQrCode({ value }: { value: string }) {
  const size = 120;
  const gridSize = 11;
  const cellSize = size / gridSize;
  const cells: { x: number; y: number }[] = [];

  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isCorner =
        (row < 3 && col < 3) ||
        (row < 3 && col >= gridSize - 3) ||
        (row >= gridSize - 3 && col < 3);
      const idx = row * gridSize + col;
      const fill = isCorner || ((hash * (idx + 1) * 7) % 3 !== 0);
      if (fill) {
        cells.push({ x: col * cellSize, y: row * cellSize });
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`QR code: ${value}`}
      style={{ border: '2px solid #0b0c0c', display: 'block', marginTop: '10px' }}
    >
      <rect width={size} height={size} fill="white" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={cellSize} height={cellSize} fill="#0b0c0c" />
      ))}
    </svg>
  );
});

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) +
    ' at ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );
}

interface Props {
  baseUrl: string;
}

export function ConfirmationPanel({ baseUrl: _baseUrl }: Props) {
  const { formData, scenario } = useRsvp();

  const event = scenario.event;
  const isDeclined = formData.attendanceStatus === 'declined';
  const isPending = formData.attendanceStatus === 'pendingApproval';
  const isWaitlisted = formData.attendanceStatus === 'waitlisted';

  let panelTitle = 'RSVP confirmed';
  let panelBody = 'Your response has been submitted.';
  if (isDeclined) {
    panelTitle = 'Response submitted';
    panelBody = 'You have declined the invitation.';
  } else if (isPending) {
    panelTitle = 'Response submitted';
    panelBody = 'Your attendance is pending approval. We will notify you once it has been confirmed.';
  } else if (isWaitlisted) {
    panelTitle = 'Added to waitlist';
    panelBody = 'You have been added to the waitlist. We will notify you if a space becomes available.';
  }

  const eventRows = [
    { key: 'Event', value: event.name },
    { key: 'Date', value: formatDateTime(event.startDateTime) },
    { key: 'Location', value: event.locationName },
  ];

  const allAttendees = [formData.primaryAttendee, ...formData.guests];

  return (
    <div>
      <GovPanel title={panelTitle} body={panelBody} />

      <h2 className="govuk-heading-m">Event details</h2>
      <GovSummaryList rows={eventRows} />

      {!isDeclined && (
        <>
          <h2 className="govuk-heading-m">Attendees</h2>
          {allAttendees.map((a, i) => {
            const qrValue =
              a.attendeeType === 'primary'
                ? scenario.attendees.find((sa) => sa.attendeeType === 'primary')?.qrCodeValue || a.attendeeId
                : `qr-${a.attendeeId}`;
            return (
              <div key={a.attendeeId} className="govuk-!-margin-bottom-4">
                <p className="govuk-body">
                  <strong>
                    {a.firstName} {a.lastName}
                  </strong>
                  {a.attendeeType === 'primary' ? ' (you)' : ` (guest ${i})`}
                </p>
                {event.qrCodeEnabled && (
                  <div aria-label={`QR code for ${a.firstName} ${a.lastName}`}>
                    <PlaceholderQrCode value={qrValue} />
                  </div>
                )}
              </div>
            );
          })}

          {formData.guests.length > 0 && event.qrCodeEnabled && (
            <GovInsetText>
              All QR codes, including those for your guests, will be sent to your
              email address (<strong>{formData.primaryAttendee.email}</strong>).
              Please share each guest&apos;s QR code with them before the event.
            </GovInsetText>
          )}
        </>
      )}

      <h2 className="govuk-heading-m">What happens next</h2>
      <p className="govuk-body">
        You will receive a confirmation email with all the details.
        {formData.guests.length > 0 && ' This will include QR codes for all attendees.'}
      </p>

      <GovButton
        type="button"
        variant="secondary"
        onClick={() => window.print()}
      >
        Print this page
      </GovButton>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

      <h2 className="govuk-heading-m">Contact</h2>
      <p className="govuk-body">
        If you have any questions about this event, contact the organiser at{' '}
        <strong>{event.organiserName}</strong>.
      </p>

      <h2 className="govuk-heading-m">Give feedback</h2>
      <p className="govuk-body">
        <a className="govuk-link" href="#">
          What did you think of this service?
        </a>{' '}
        (takes 30 seconds)
      </p>
    </div>
  );
}
