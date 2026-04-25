import { getAllTokens, getScenario } from '@/mock/mockData';
import { RsvpTokenShell } from './RsvpTokenShell';

export function generateStaticParams() {
  // Include scenario-14 (invalid token) so its static page is generated
  return [...getAllTokens(), 'scenario-14'].map((token) => ({ token }));
}

export default function RsvpTokenLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { token: string };
}) {
  const scenario = getScenario(params.token);

  return (
    <RsvpTokenShell scenarioJson={scenario ? JSON.stringify(scenario) : null}>
      {children}
    </RsvpTokenShell>
  );
}
