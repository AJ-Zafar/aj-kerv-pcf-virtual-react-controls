'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { GovPanel, GovSummaryList, GovInsetText, GovButton } from '@/components/gov';
import Link from 'next/link';

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) +
    ' at ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  baseUrl: string;
}

export function ConfirmationPanel({ baseUrl }: Props) {
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
          {allAttendees.map((a, i) => (
            <div key={a.attendeeId} style={{ marginBottom: '20px' }}>
              <p className="govuk-body">
                <strong>
                  {a.firstName} {a.lastName}
                </strong>
                {a.attendeeType === 'primary' ? ' (you)' : ` (guest ${i})`}
              </p>
              {event.qrCodeEnabled && (
                <GovInsetText>
                  {/* Future: Replace with <QRCode value={a.qrCodeValue} /> from qrcode.react */}
                  <span aria-label={`QR code for ${a.firstName} ${a.lastName}`}>
                    [QR Code: {a.attendeeType === 'primary'
                      ? scenario.attendees.find((sa) => sa.attendeeType === 'primary')?.qrCodeValue
                      : `qr-${a.attendeeId}`}]
                  </span>
                </GovInsetText>
              )}
            </div>
          ))}
        </>
      )}

      <h2 className="govuk-heading-m">What happens next</h2>
      <p className="govuk-body">
        You will receive a confirmation email with all the details.
      </p>

      {/* Future: Generate .ics calendar file */}
      <GovButton type="button" variant="secondary" onClick={() => alert('Add to calendar — not yet implemented')}>
        Add to calendar
      </GovButton>

      {event.editRsvpAllowed && (
        <p className="govuk-body" style={{ marginTop: '20px' }}>
          <Link className="govuk-link" href={`${baseUrl}/attendance/`}>
            Edit your response
          </Link>
        </p>
      )}
    </div>
  );
}
