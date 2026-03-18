import * as React from 'react';
import { Section, FilterPane, Table, Pagination, Tag, Button } from '../index';
import './ListPageExample.css';

interface ListPageExampleState {
  selectedValues: { [sectionId: string]: string[] };
  currentPage: number;
}

interface ListPageExampleProps {
  onViewCase?: (caseRef: string) => void;
}

const filterSections = [
  {
    id: 'status',
    title: 'Status',
    collapsible: true,
    initiallyExpanded: true,
    options: [
      { label: 'Open', value: 'open', count: 14 },
      { label: 'In review', value: 'review', count: 6 },
      { label: 'Resolved', value: 'resolved', count: 32 },
      { label: 'Closed', value: 'closed', count: 9 },
    ],
  },
  {
    id: 'priority',
    title: 'Priority',
    collapsible: true,
    initiallyExpanded: true,
    options: [
      { label: 'High', value: 'high', count: 5 },
      { label: 'Medium', value: 'medium', count: 22 },
      { label: 'Low', value: 'low', count: 34 },
    ],
  },
  {
    id: 'type',
    title: 'Type',
    collapsible: true,
    initiallyExpanded: false,
    options: [
      { label: 'Incident', value: 'incident', count: 19 },
      { label: 'Request', value: 'request', count: 28 },
      { label: 'Permit', value: 'permit', count: 14 },
    ],
  },
];

const tableHead = [
  { text: 'Case' },
  { text: 'Status' },
  { text: 'Owner' },
  { text: 'Updated' },
  { text: 'Action' },
];

export class ListPageExample extends React.Component<ListPageExampleProps, ListPageExampleState> {
  state: ListPageExampleState = {
    selectedValues: {
      status: ['open', 'review'],
      priority: [],
      type: [],
    },
    currentPage: 1,
  };

  handleSelectionChange = (selectedValues: { [sectionId: string]: string[] }) => {
    this.setState({ selectedValues });
  };

  handleApply = () => {
    this.setState({ currentPage: 1 });
  };

  handleClear = () => {
    this.setState({
      selectedValues: { status: [], priority: [], type: [] },
      currentPage: 1,
    });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleViewCase = (caseRef: string) => {
    if (this.props.onViewCase) {
      this.props.onViewCase(caseRef);
    }
  };

  render() {
    const { selectedValues, currentPage } = this.state;

    const rows = [
      [
        { text: 'CASE-1042' },
        { content: <Tag tone="green">Open</Tag> },
        { text: 'A. Patel' },
        { text: '2 Mar 2026' },
        {
          content: (
          <a
            href="#"
            className="example-list-page__view-link"
            onClick={(event) => {
              event.preventDefault();
              this.handleViewCase('CASE-1042');
            }}
          >
            View<span className="govuk-visually-hidden"> case CASE-1042</span>
          </a>
          ),
        },
      ],
      [
        { text: 'CASE-1037' },
        { content: <Tag tone="blue">In review</Tag> },
        { text: 'S. Wong' },
        { text: '28 Feb 2026' },
        {
          content: (
          <a
            href="#"
            className="example-list-page__view-link"
            onClick={(event) => {
              event.preventDefault();
              this.handleViewCase('CASE-1037');
            }}
          >
            View<span className="govuk-visually-hidden"> case CASE-1037</span>
          </a>
          ),
        },
      ],
      [
        { text: 'CASE-1024' },
        { content: <Tag tone="grey">Closed</Tag> },
        { text: 'J. Ahmed' },
        { text: '21 Feb 2026' },
        {
          content: (
          <a
            href="#"
            className="example-list-page__view-link"
            onClick={(event) => {
              event.preventDefault();
              this.handleViewCase('CASE-1024');
            }}
          >
            View<span className="govuk-visually-hidden"> case CASE-1024</span>
          </a>
          ),
        },
      ],
      [
        { text: 'CASE-1019' },
        { content: <Tag tone="orange">Resolved</Tag> },
        { text: 'M. Hill' },
        { text: '18 Feb 2026' },
        {
          content: (
          <a
            href="#"
            className="example-list-page__view-link"
            onClick={(event) => {
              event.preventDefault();
              this.handleViewCase('CASE-1019');
            }}
          >
            View<span className="govuk-visually-hidden"> case CASE-1019</span>
          </a>
          ),
        },
      ],
    ];

    return (
      <div className="example-list-page">
        <Section
          title="Case list"
          description="Monitor and triage reported cases across services."
          actions={
            <div className="example-list-page__actions">
              <Button type="button">New case</Button>
              <Button type="button" variant="secondary">
                Export
              </Button>
            </div>
          }
        >
          <div className="example-list-page__layout">
            <aside className="example-list-page__filters" aria-label="Case filters">
              <div className="example-list-page__panel">
                <FilterPane
                  title="Filter cases"
                  sections={filterSections}
                  selectedValues={selectedValues}
                  onSelectionChange={this.handleSelectionChange}
                  onApply={this.handleApply}
                  onClear={this.handleClear}
                  searchable
                />
              </div>
            </aside>

            <div className="example-list-page__results">
              <div className="example-list-page__results-header">
                <h3 className="example-list-page__results-title">Case results</h3>
                <p className="example-list-page__results-meta">Showing 4 of 61 cases</p>
              </div>

              <div className="example-list-page__panel">
                <Table
                  caption="Cases"
                  captionClasses="govuk-table__caption--m"
                  head={tableHead}
                  body={rows}
                  firstCellIsHeader
                  compact
                  zebra
                />
              </div>

              <div className="example-list-page__pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={5}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}
