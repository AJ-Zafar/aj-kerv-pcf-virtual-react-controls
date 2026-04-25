import type { Metadata } from 'next';
import './globals.scss';
import { GovInit } from '@/components/gov/GovInit';

export const metadata: Metadata = {
  title: 'RSVP Portal',
  description: 'GDS-style RSVP portal for events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="govuk-template">
      <body className="govuk-template__body js-enabled">
        <GovInit />
        {children}
      </body>
    </html>
  );
}
