'use client';

import React from 'react';
import { GdsEvent } from '@/types/dataverse';
import { GovSummaryList, GovInsetText } from '@/components/gov';

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
  event: GdsEvent;
}

export function EventSummary({ event }: Props) {
  const rows = [
    { key: 'Date and time', value: `${formatDateTime(event.startDateTime)} to ${formatDateTime(event.endDateTime)}` },
    { key: 'Location', value: locationText(event) },
    { key: 'Organiser', value: event.organiserName },
    { key: 'RSVP deadline', value: formatDateTime(event.rsvpDeadline) },
  ];

  return (
    <div>
      <h2 className="govuk-heading-l">{event.name}</h2>
      <GovInsetText>{event.description}</GovInsetText>
      <GovSummaryList rows={rows} />
    </div>
  );
}

function locationText(event: GdsEvent): React.ReactNode {
  if (event.locationType === 'physical') {
    return (
      <>
        {event.locationName}
        <br />
        {event.locationAddress}
      </>
    );
  }
  if (event.locationType === 'virtual') {
    return 'Online event — join link will be provided';
  }
  return (
    <>
      {event.locationName}
      <br />
      {event.locationAddress}
      <br />
      <span className="govuk-body-s">Also available online</span>
    </>
  );
}
