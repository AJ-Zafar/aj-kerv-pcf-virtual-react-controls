import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { RsvpProvider } from '@/context/RsvpContext';
import { GovPageLayout } from '@/components/gov/GovPageLayout';
import { ScenarioData } from '@/types/dataverse';

type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; scenario: ScenarioData }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

export function RsvpTokenWrapper() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    if (!token) {
      navigate('/invalid', { replace: true });
      return;
    }

    // Basic client-side token format guard (alphanumeric, 8-64 chars)
    if (!/^[a-zA-Z0-9]{8,64}$/.test(token)) {
      navigate('/invalid', { replace: true });
      return;
    }

    let cancelled = false;

    fetch(`/api/rsvp/${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setState({ status: 'not-found' });
          return;
        }
        if (!res.ok) {
          const text = await res.text().catch(() => 'Unknown error');
          setState({ status: 'error', message: `Server error (${res.status}): ${text}` });
          return;
        }
        const data = (await res.json()) as ScenarioData;
        setState({ status: 'ok', scenario: data });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Network error',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [token, navigate]);

  if (state.status === 'loading') {
    return (
      <GovPageLayout serviceName="RSVP Portal">
        <p className="govuk-body">Loading your invitation…</p>
      </GovPageLayout>
    );
  }

  if (state.status === 'not-found') {
    navigate('/invalid', { replace: true });
    return null;
  }

  if (state.status === 'error') {
    return (
      <GovPageLayout serviceName="RSVP Portal">
        <h1 className="govuk-heading-l">Something went wrong</h1>
        <p className="govuk-body">{state.message}</p>
        <p className="govuk-body">
          Please try again later or contact the event organiser.
        </p>
      </GovPageLayout>
    );
  }

  return (
    <RsvpProvider scenario={state.scenario}>
      <GovPageLayout serviceName="RSVP Portal">
        <Outlet />
      </GovPageLayout>
    </RsvpProvider>
  );
}
