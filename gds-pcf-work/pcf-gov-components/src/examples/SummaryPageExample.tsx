import * as React from 'react';
import { Breadcrumbs, Section, SummaryList, Tag, Button } from '../index';
import './SummaryPageExample.css';

interface SummaryPageExampleProps {
  caseRef?: string | null;
}

/**
 * Summary/detail page example
 */
export const SummaryPageExample: React.FC<SummaryPageExampleProps> = ({ caseRef }) => {
  const displayCaseRef = caseRef || 'CASE-1042';
  
  const breadcrumbItems = [
    { text: 'Home', href: '#' },
    { text: 'Cases', href: '#' },
    { text: displayCaseRef, isCurrent: true },
  ];
  
  const summaryRows = [
    { key: 'Status', value: <Tag tone="green">Open</Tag> },
    { key: 'Owner', value: 'A. Patel' },
    { key: 'Priority', value: 'Medium' },
    { key: 'Service', value: 'Citizen support' },
    { key: 'Created', value: '25 Feb 2026' },
    { key: 'Updated', value: '2 Mar 2026' },
  ];

  return (
    <div className="example-summary-page">
      <div className="example-summary-page__breadcrumbs">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <Section
        title={displayCaseRef}
        description="Reported connectivity issue affecting service users."
        actions={
          <div className="example-summary-page__actions">
            <Button type="button">Edit case</Button>
            <Button type="button" variant="secondary">
              Close case
            </Button>
          </div>
        }
      >
        <div className="example-summary-page__meta">
          <span className="example-summary-page__meta-label">Current status</span>
          <Tag tone="green">Open</Tag>
        </div>
        <SummaryList rows={summaryRows} />
      </Section>
    </div>
  );
};
