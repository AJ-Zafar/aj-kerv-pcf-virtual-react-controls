'use client';

import React from 'react';
import { useRsvp } from '@/context/RsvpContext';
import { useRouter, useParams } from 'next/navigation';
import { EventSummary } from '@/components/rsvp/EventSummary';
import {
  GovNotificationBanner,
  GovButton,
  GovInsetText,
} from '@/components/gov';
import { isReadOnly } from '@/lib/businessRules';

export default function RsvpEntryPage() {
  const { scenario, rsvpState, formData, steps } = useRsvp();
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const baseUrl = `/rsvp/${token}`;

  const handleStartRsvp = () => {
    router.push(`${baseUrl}/${steps[0]}/`);
  };

  const handleEditRsvp = () => {
    router.push(`${baseUrl}/attendance/`);
  };

  return (
    <div>
      <EventSummary event={scenario.event} />

      {rsvpState === 'cancelled' && (
        <GovNotificationBanner type="info" title="Event cancelled">
          <p className="govuk-body">
            This event has been cancelled. You do not need to respond.
          </p>
        </GovNotificationBanner>
      )}

      {rsvpState === 'expired' && (
        <GovNotificationBanner type="info" title="RSVP closed">
          <p className="govuk-body">
            The deadline to respond to this invitation has passed. You can no
            longer submit or change your RSVP.
          </p>
        </GovNotificationBanner>
      )}

      {rsvpState === 'closed' && (
        <GovNotificationBanner type="info" title="RSVP closed">
          <p className="govuk-body">
            This event is no longer accepting RSVPs.
          </p>
        </GovNotificationBanner>
      )}

      {rsvpState === 'full' && (
        <GovNotificationBanner type="info" title="Event full">
          <p className="govuk-body">
            This event is currently full and is not accepting further RSVPs.
          </p>
        </GovNotificationBanner>
      )}

      {rsvpState === 'fullWaitlist' && (
        <GovNotificationBanner type="info" title="Event full — waitlist available">
          <p className="govuk-body">
            This event is currently full, but you can join the waitlist. We will
            notify you if a space becomes available.
          </p>
        </GovNotificationBanner>
      )}

      {rsvpState === 'alreadyRespondedReadOnly' && (
        <GovNotificationBanner type="success" title="Already responded">
          <p className="govuk-body">
            You have already responded to this invitation. Your response cannot
            be changed.
          </p>
          <GovButton
            type="button"
            variant="secondary"
            onClick={() => router.push(`${baseUrl}/confirmation/`)}
          >
            View your response
          </GovButton>
        </GovNotificationBanner>
      )}

      {rsvpState === 'alreadyRespondedEditable' && (
        <GovNotificationBanner type="success" title="Already responded">
          <p className="govuk-body">
            You have already responded to this invitation. You can update your
            response below.
          </p>
          <GovButton type="button" onClick={handleEditRsvp}>
            Edit your response
          </GovButton>
        </GovNotificationBanner>
      )}

      {rsvpState === 'open' && (
        <GovButton type="button" variant="start" onClick={handleStartRsvp}>
          Start your RSVP
        </GovButton>
      )}

      {rsvpState === 'fullWaitlist' && (
        <GovButton type="button" variant="start" onClick={handleStartRsvp}>
          Join the waitlist
        </GovButton>
      )}
    </div>
  );
}
