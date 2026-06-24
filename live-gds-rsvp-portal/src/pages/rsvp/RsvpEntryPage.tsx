import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRsvp } from '@/context/RsvpContext';
import { EventSummary } from '@/components/rsvp/EventSummary';
import { GovNotificationBanner } from '@/components/gov/GovNotificationBanner';
import { GovButton } from '@/components/gov/GovButton';
import { STEP_LABELS } from '@/lib/businessRules';

export function RsvpEntryPage() {
  const { scenario, rsvpState, steps } = useRsvp();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const baseUrl = `/rsvp/${token}`;
  const event = scenario.event;
  const invitation = scenario.invitation;

  const handleStartRsvp = () => {
    navigate(`${baseUrl}/${steps[0]}`);
  };

  const handleEditRsvp = () => {
    navigate(`${baseUrl}/attendance`);
  };

  return (
    <div>
      <EventSummary event={event} />

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
          <p className="govuk-body">This event is no longer accepting RSVPs.</p>
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
        <GovNotificationBanner type="info" title="Event full - waitlist available">
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
            onClick={() => navigate(`${baseUrl}/confirmation`)}
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

      {(rsvpState === 'open' || rsvpState === 'fullWaitlist') && (
        <>
          <h2 className="govuk-heading-m">Before you start</h2>
          <p className="govuk-body">You will be asked to provide:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>whether you can attend</li>
            {invitation.maxGuestsAllowed > 0 && (
              <li>
                details of any guests you would like to bring
                {invitation.guestEmailRequired
                  ? ' (you will need their email addresses)'
                  : ''}
              </li>
            )}
            {event.dietaryRequirementsEnabled && <li>any dietary requirements</li>}
            {event.accessibilityRequirementsEnabled && <li>any accessibility needs</li>}
            {scenario.questions.length > 0 && (
              <li>answers to some additional questions from the organiser</li>
            )}
            <li>your contact details</li>
          </ul>
          <p className="govuk-body">Completing this should take approximately 5 minutes.</p>

          <h2 className="govuk-heading-m">Steps you will complete</h2>
          <ol className="govuk-list govuk-list--number">
            {steps.map((s) => (
              <li key={s}>{STEP_LABELS[s]}</li>
            ))}
          </ol>
        </>
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
