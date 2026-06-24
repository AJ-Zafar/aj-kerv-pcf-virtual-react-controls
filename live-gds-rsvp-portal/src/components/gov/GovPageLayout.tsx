import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  serviceName: string;
  serviceUrl?: string;
  children: React.ReactNode;
  backLink?: React.ReactNode;
}

export const GovPageLayout = React.memo(function GovPageLayout({
  serviceName,
  serviceUrl = '/',
  children,
  backLink,
}: Props) {
  return (
    <>
      <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
        Skip to main content
      </a>

      <header className="govuk-header" data-module="govuk-header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <Link to="/" className="govuk-header__link govuk-header__link--homepage">
              <span className="govuk-header__logotype">
                <svg
                  aria-label="GOV.UK"
                  className="govuk-header__logotype"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  viewBox="0 0 324 60"
                  height="30"
                  width="162"
                  fill="currentcolor"
                >
                  <title>GOV.UK</title>
                  <g>
                    <circle cx="20" cy="17.6" r="3.7" />
                    <circle cx="10.2" cy="23.5" r="3.7" />
                    <circle cx="3.7" cy="33.2" r="3.7" />
                    <circle cx="31.7" cy="30.6" r="3.7" />
                    <circle cx="43.3" cy="17.6" r="3.7" />
                    <circle cx="53.2" cy="23.5" r="3.7" />
                    <circle cx="59.7" cy="33.2" r="3.7" />
                    <path d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z" />
                  </g>
                </svg>
              </span>
            </Link>
          </div>
          <div className="govuk-header__content">
            <Link to={serviceUrl} className="govuk-header__link govuk-header__service-name">
              {serviceName}
            </Link>
          </div>
        </div>
      </header>

      <div className="govuk-width-container">
        <div className="govuk-phase-banner">
          <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">Beta</strong>
            <span className="govuk-phase-banner__text">
              This is a new service.{' '}
              <a className="govuk-link" href="#">
                Give feedback
              </a>{' '}
              to help us improve it.
            </span>
          </p>
        </div>

        {backLink}

        <main className="govuk-main-wrapper" id="main-content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">{children}</div>
          </div>
        </main>
      </div>

      <footer className="govuk-footer">
        <div className="govuk-width-container">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
              <span className="govuk-footer__licence-description">
                All content is available under the{' '}
                <a
                  className="govuk-footer__link"
                  href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                  rel="license"
                >
                  Open Government Licence v3.0
                </a>
                , except where otherwise stated
              </span>
            </div>
            <div className="govuk-footer__meta-item">
              <a
                className="govuk-footer__link govuk-footer__copyright-logo"
                href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
              >
                &copy; Crown copyright
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});
