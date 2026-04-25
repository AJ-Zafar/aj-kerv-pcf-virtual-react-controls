'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { RsvpProvider } from '@/context/RsvpContext';
import { GovPageLayout } from '@/components/gov';
import { ScenarioData } from '@/types/dataverse';

interface Props {
  scenarioJson: string | null;
  children: React.ReactNode;
}

export function RsvpTokenShell({ scenarioJson, children }: Props) {
  const router = useRouter();
  const isInvalid = !scenarioJson;

  // Parse scenario once and memoise — avoids re-creating the object on every render
  const scenario = useMemo<ScenarioData | null>(
    () => (scenarioJson ? JSON.parse(scenarioJson) : null),
    [scenarioJson]
  );

  // Redirect must be unconditional hook call (React rules of hooks)
  useEffect(() => {
    if (isInvalid) {
      router.replace('/invalid/');
    }
  }, [isInvalid, router]);

  if (isInvalid || !scenario) {
    return (
      <GovPageLayout serviceName="RSVP Portal">
        <p className="govuk-body">Redirecting…</p>
      </GovPageLayout>
    );
  }

  return (
    <RsvpProvider scenario={scenario}>
      <GovPageLayout serviceName="RSVP Portal">
        {children}
      </GovPageLayout>
    </RsvpProvider>
  );
}
