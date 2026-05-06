import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RSVP Portal',
  description: 'GDS-style RSVP portal for events',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="govuk-template">
      <head>
        <link rel="stylesheet" href="/assets/govuk-frontend.min.css" />
      </head>
      <body className="govuk-template__body">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.add('js-enabled');`,
          }}
        />
        <noscript>
          <div className="govuk-width-container">
            <p className="govuk-body">
              You must have JavaScript enabled to use this service.
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
