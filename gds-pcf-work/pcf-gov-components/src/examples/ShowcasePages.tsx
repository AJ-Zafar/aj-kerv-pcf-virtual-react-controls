import * as React from 'react';
import {
  Accordion,
  BackLink,
  Breadcrumbs,
  Button,
  CharacterCount,
  CheckboxGroup,
  DateInput,
  Details,
  ErrorMessage,
  ErrorSummary,
  FileUpload,
  FilterPane,
  FormGroup,
  Hint,
  InsetText,
  Label,
  NotificationBanner,
  Pagination,
  Panel,
  PhaseBanner,
  RadioGroup,
  Section,
  SectionBreak,
  Select,
  SummaryList,
  Table,
  Tabs,
  Tag,
  TaskList,
  Textarea,
  TextInput,
  WarningText,
} from '../index';
import './ShowcasePages.css';

export type ShowcasePageId =
  | 'index'
  | 'forms'
  | 'tables'
  | 'navigation'
  | 'feedback'
  | 'layout'
  | 'disclosure'
  | 'task'
  | 'list-example'
  | 'form-example'
  | 'summary-example'
  | 'task-example'
  | 'upload-example';

export interface ShowcasePageMeta {
  id: ShowcasePageId;
  title: string;
  description: string;
  components: string[];
}

export const SHOWCASE_PAGES: ShowcasePageMeta[] = [
  {
    id: 'forms',
    title: 'Form controls showcase',
    description: 'Inputs, labels, validation, button states, and selectable controls.',
    components: [
      'Button',
      'Label',
      'Hint',
      'ErrorMessage',
      'FormGroup',
      'TextInput',
      'Textarea',
      'Select',
      'CheckboxGroup',
      'RadioGroup',
      'CharacterCount',
      'DateInput',
      'FileUpload',
    ],
  },
  {
    id: 'tables',
    title: 'Table and summary showcase',
    description:
      'Table component coverage, semantic table comparison, and summary list patterns.',
    components: ['Table', 'SummaryList', 'Tag'],
  },
  {
    id: 'navigation',
    title: 'Navigation showcase',
    description: 'Breadcrumb and pagination behaviour and visual state checks.',
    components: ['BackLink', 'Breadcrumbs', 'Pagination'],
  },
  {
    id: 'feedback',
    title: 'Feedback showcase',
    description: 'Status tags, banners, confirmation panels, error summaries, warnings and phase banners.',
    components: ['Tag', 'NotificationBanner', 'Panel', 'ErrorSummary', 'WarningText', 'PhaseBanner'],
  },
  {
    id: 'layout',
    title: 'Layout and filtering showcase',
    description: 'Section composition and filter pane interaction states.',
    components: ['Section', 'FilterPane', 'SectionBreak', 'InsetText'],
  },
  {
    id: 'disclosure',
    title: 'Progressive disclosure showcase',
    description: 'Accordion, collapsible details, and tabbed content patterns.',
    components: ['Accordion', 'Details', 'Tabs'],
  },
  {
    id: 'task',
    title: 'Task list showcase',
    description: 'Task list with statuses, progression states, and link behaviour.',
    components: ['TaskList'],
  },
  {
    id: 'list-example',
    title: 'Case list example page',
    description: 'Existing composite list screen for integration QA.',
    components: ['Section', 'FilterPane', 'Table', 'Pagination', 'Tag', 'Button'],
  },
  {
    id: 'form-example',
    title: 'Case form example page',
    description: 'Existing composite form screen for end-to-end form QA.',
    components: [
      'Section',
      'FormGroup',
      'Label',
      'Hint',
      'ErrorMessage',
      'TextInput',
      'Textarea',
      'Select',
      'CheckboxGroup',
      'RadioGroup',
      'Button',
    ],
  },
  {
    id: 'summary-example',
    title: 'Case summary example page',
    description: 'Existing composite summary screen for detail-view QA.',
    components: ['Breadcrumbs', 'Section', 'SummaryList', 'Tag', 'Button'],
  },
  {
    id: 'task-example',
    title: 'Task progress example page',
    description: 'Task-list driven workflow showing progression through a multi-step process.',
    components: ['TaskList', 'Panel', 'NotificationBanner', 'Tag', 'Button', 'Section'],
  },
  {
    id: 'upload-example',
    title: 'Upload flow example page',
    description: 'File upload journey with validation, error summary, and confirmation.',
    components: ['FileUpload', 'ErrorSummary', 'Panel', 'Button', 'Section', 'Tag'],
  },
];

interface ShowcaseIndexPageProps {
  onNavigate: (id: ShowcasePageId) => void;
}

export const ShowcaseIndexPage: React.FC<ShowcaseIndexPageProps> = ({ onNavigate }) => {
  return (
    <div className="showcase-page">
      <h2 className="showcase-page__title">Component showcase index</h2>
      <p className="showcase-page__intro">
        Use this index as a visual QA surface. Each page presents key states side by side,
        including demo-only forced pseudo-states where helpful.
      </p>

      <table className="govuk-table showcase-index-table">
        <caption className="govuk-table__caption">All exported components and where to inspect them</caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th className="govuk-table__header">Component</th>
            <th className="govuk-table__header">Showcase page</th>
            <th className="govuk-table__header">Focus area</th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {SHOWCASE_PAGES.filter((page) => page.id !== 'index').map((page) =>
            page.components.map((componentName, index) => (
              <tr className="govuk-table__row" key={page.id + '-' + componentName + '-' + index}>
                <td className="govuk-table__cell">{componentName}</td>
                <td className="govuk-table__cell">
                  <button
                    type="button"
                    className="showcase-link-button"
                    onClick={() => onNavigate(page.id)}
                  >
                    {page.title}
                  </button>
                </td>
                <td className="govuk-table__cell">{page.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ReviewNotes
        title="Index review notes"
        items={[
          'Check every exported component has at least one destination page in this index.',
          'Check that page titles match team vocabulary used for QA sign-off.',
          'Check that duplicate component entries (when used in multiple pages) are intentional.',
        ]}
      />
    </div>
  );
};

interface ReviewNotesProps {
  title: string;
  items: string[];
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({ title, items }) => (
  <aside className="showcase-review-notes" aria-label={title}>
    <h3 className="showcase-review-notes__title">{title}</h3>
    <ul className="showcase-review-notes__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </aside>
);

const StateCard: React.FC<{ label: string; className?: string; children: React.ReactNode }> = ({
  label,
  className,
  children,
}) => (
  <div className="showcase-state-card">
    <h4 className="showcase-state-card__title">{label}</h4>
    <div className={className ? 'showcase-state-card__body ' + className : 'showcase-state-card__body'}>
      {children}
    </div>
  </div>
);

interface ShowcasePageProps {
  pageId: ShowcasePageId;
}

interface ShowcasePageState {
  paginationPage: number;
  filterValues: { [sectionId: string]: string[] };
}

export class ShowcasePage extends React.Component<ShowcasePageProps, ShowcasePageState> {
  state: ShowcasePageState = {
    paginationPage: 2,
    filterValues: {
      status: ['open'],
      priority: ['high'],
    },
  };

  handlePaginationChange = (page: number) => {
    this.setState({ paginationPage: page });
  };

  handleFilterChange = (filterValues: { [sectionId: string]: string[] }) => {
    this.setState({ filterValues });
  };

  renderFormsShowcase() {
    const checkboxOptions = [
      { value: 'email', label: 'Email', hint: 'Sends updates by email' },
      { value: 'sms', label: 'SMS' },
      { value: 'post', label: 'Post', disabled: true },
    ];
    const radioOptions = [
      { value: 'standard', label: 'Standard response' },
      { value: 'priority', label: 'Priority response', hint: 'Escalate within 4 hours' },
      { value: 'defer', label: 'Deferred', disabled: true },
    ];

    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Form controls showcase</h2>

        <Section title="Buttons" description="Primary, secondary, warning and forced pseudo-state previews.">
          <div className="showcase-state-grid">
            <StateCard label="Primary (default)">
              <Button type="button">Save and continue</Button>
            </StateCard>
            <StateCard label="Secondary">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </StateCard>
            <StateCard label="Destructive (warning variant)">
              <Button type="button" variant="warning">
                Delete case
              </Button>
            </StateCard>
            <StateCard label="Disabled primary">
              <Button type="button" disabled>
                Save and continue
              </Button>
            </StateCard>
            <StateCard label="Disabled secondary">
              <Button type="button" variant="secondary" disabled>
                Cancel
              </Button>
            </StateCard>
            <StateCard label="Hover representation" className="showcase-force-button-hover">
              <Button type="button">Save and continue</Button>
            </StateCard>
            <StateCard label="Focus representation" className="showcase-force-button-focus">
              <Button type="button">Save and continue</Button>
            </StateCard>
            <StateCard label="Active representation" className="showcase-force-button-active">
              <Button type="button">Save and continue</Button>
            </StateCard>
            <StateCard label="Text-only">
              <Button type="button">Continue</Button>
            </StateCard>
            <StateCard label="Loading style (custom placeholder)">
              <Button type="button" disabled>
                Saving...
              </Button>
            </StateCard>
            <StateCard label="Full-width variant">
              <Button type="button" fullWidth>
                Full width action
              </Button>
            </StateCard>
          </div>
        </Section>

        <Section title="Text input" description="With label, hint, validation and focus/disabled examples.">
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Empty with label + hint">
              <FormGroup>
                <Label htmlFor="showcase-text-empty">Case reference</Label>
                <Hint id="showcase-text-empty-hint">Use the intake request reference.</Hint>
                <TextInput
                  id="showcase-text-empty"
                  name="showcaseTextEmpty"
                  value=""
                  onChange={() => undefined}
                  describedBy="showcase-text-empty-hint"
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Filled">
              <FormGroup>
                <Label htmlFor="showcase-text-filled">Case reference</Label>
                <TextInput
                  id="showcase-text-filled"
                  name="showcaseTextFilled"
                  value="CASE-2045"
                  onChange={() => undefined}
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Focused representation" className="showcase-force-input-focus">
              <FormGroup>
                <Label htmlFor="showcase-text-focus">Case reference</Label>
                <TextInput
                  id="showcase-text-focus"
                  name="showcaseTextFocus"
                  value="CASE-1042"
                  onChange={() => undefined}
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Disabled">
              <FormGroup>
                <Label htmlFor="showcase-text-disabled">Case reference</Label>
                <TextInput
                  id="showcase-text-disabled"
                  name="showcaseTextDisabled"
                  value="CASE-1042"
                  onChange={() => undefined}
                  disabled
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Error + validation message">
              <FormGroup error>
                <Label htmlFor="showcase-text-error">Case reference</Label>
                <Hint id="showcase-text-error-hint">Use the intake request reference.</Hint>
                <ErrorMessage id="showcase-text-error-message">Enter a case reference</ErrorMessage>
                <TextInput
                  id="showcase-text-error"
                  name="showcaseTextError"
                  value=""
                  onChange={() => undefined}
                  error
                  describedBy="showcase-text-error-hint showcase-text-error-message"
                />
              </FormGroup>
            </StateCard>
          </div>
        </Section>

        <Section title="Textarea and select" description="Text area and select state coverage.">
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Textarea empty">
              <FormGroup>
                <Label htmlFor="showcase-textarea-empty">Description</Label>
                <Hint id="showcase-textarea-hint">Summarise issue and impact.</Hint>
                <Textarea
                  id="showcase-textarea-empty"
                  name="showcaseTextareaEmpty"
                  value=""
                  onChange={() => undefined}
                  describedBy="showcase-textarea-hint"
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Textarea filled">
              <FormGroup>
                <Label htmlFor="showcase-textarea-filled">Description</Label>
                <Textarea
                  id="showcase-textarea-filled"
                  name="showcaseTextareaFilled"
                  value="Service users cannot access online account area from mobile devices."
                  onChange={() => undefined}
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Textarea focused representation" className="showcase-force-input-focus">
              <FormGroup>
                <Label htmlFor="showcase-textarea-focus">Description</Label>
                <Textarea
                  id="showcase-textarea-focus"
                  name="showcaseTextareaFocus"
                  value="Focused state preview"
                  onChange={() => undefined}
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Textarea disabled">
              <FormGroup>
                <Label htmlFor="showcase-textarea-disabled">Description</Label>
                <Textarea
                  id="showcase-textarea-disabled"
                  name="showcaseTextareaDisabled"
                  value="Read-only equivalent currently represented as disabled."
                  onChange={() => undefined}
                  disabled
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Select empty + hint">
              <FormGroup>
                <Label htmlFor="showcase-select-empty">Category</Label>
                <Hint id="showcase-select-empty-hint">Choose one category.</Hint>
                <Select
                  id="showcase-select-empty"
                  name="showcaseSelectEmpty"
                  value=""
                  onChange={() => undefined}
                  describedBy="showcase-select-empty-hint"
                >
                  <option value="">Select a category</option>
                  <option value="incident">Incident</option>
                  <option value="request">Request</option>
                </Select>
              </FormGroup>
            </StateCard>
            <StateCard label="Select selected">
              <FormGroup>
                <Label htmlFor="showcase-select-selected">Category</Label>
                <Select
                  id="showcase-select-selected"
                  name="showcaseSelectSelected"
                  value="incident"
                  onChange={() => undefined}
                >
                  <option value="">Select a category</option>
                  <option value="incident">Incident</option>
                  <option value="request">Request</option>
                </Select>
              </FormGroup>
            </StateCard>
            <StateCard label="Select focused representation" className="showcase-force-input-focus">
              <FormGroup>
                <Label htmlFor="showcase-select-focus">Category</Label>
                <Select
                  id="showcase-select-focus"
                  name="showcaseSelectFocus"
                  value="request"
                  onChange={() => undefined}
                >
                  <option value="incident">Incident</option>
                  <option value="request">Request</option>
                </Select>
              </FormGroup>
            </StateCard>
            <StateCard label="Select disabled">
              <FormGroup>
                <Label htmlFor="showcase-select-disabled">Category</Label>
                <Select
                  id="showcase-select-disabled"
                  name="showcaseSelectDisabled"
                  value="incident"
                  onChange={() => undefined}
                  disabled
                >
                  <option value="incident">Incident</option>
                </Select>
              </FormGroup>
            </StateCard>
            <StateCard label="Select error + validation">
              <FormGroup error>
                <Label htmlFor="showcase-select-error">Category</Label>
                <ErrorMessage id="showcase-select-error-message">Choose a category</ErrorMessage>
                <Select
                  id="showcase-select-error"
                  name="showcaseSelectError"
                  value=""
                  onChange={() => undefined}
                  error
                  describedBy="showcase-select-error-message"
                >
                  <option value="">Select a category</option>
                  <option value="incident">Incident</option>
                  <option value="request">Request</option>
                </Select>
              </FormGroup>
            </StateCard>
          </div>
        </Section>

        <Section
          title="Checkbox and radio groups"
          description="Unchecked, selected, disabled, focused representation, and error examples."
        >
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Checkbox unselected">
              <CheckboxGroup
                id="showcase-checkbox-unselected"
                name="showcaseCheckboxUnselected"
                legend="Notify channels"
                values={[]}
                onChange={() => undefined}
                options={checkboxOptions}
              />
            </StateCard>
            <StateCard label="Checkbox selected">
              <CheckboxGroup
                id="showcase-checkbox-selected"
                name="showcaseCheckboxSelected"
                legend="Notify channels"
                values={['email', 'sms']}
                onChange={() => undefined}
                options={checkboxOptions}
              />
            </StateCard>
            <StateCard label="Checkbox disabled unchecked">
              <CheckboxGroup
                id="showcase-checkbox-disabled-unchecked"
                name="showcaseCheckboxDisabledUnchecked"
                legend="Notify channels"
                values={[]}
                onChange={() => undefined}
                options={checkboxOptions}
                disabled
              />
            </StateCard>
            <StateCard label="Checkbox disabled checked">
              <CheckboxGroup
                id="showcase-checkbox-disabled-checked"
                name="showcaseCheckboxDisabledChecked"
                legend="Notify channels"
                values={['email']}
                onChange={() => undefined}
                options={checkboxOptions}
                disabled
              />
            </StateCard>
            <StateCard label="Checkbox error">
              <FormGroup error>
                <ErrorMessage id="showcase-checkbox-error-message">
                  Select at least one channel
                </ErrorMessage>
                <CheckboxGroup
                  id="showcase-checkbox-error"
                  name="showcaseCheckboxError"
                  legend="Notify channels"
                  values={[]}
                  onChange={() => undefined}
                  options={checkboxOptions}
                  error
                  describedBy="showcase-checkbox-error-message"
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Checkbox focus representation" className="showcase-force-checkbox-focus">
              <CheckboxGroup
                id="showcase-checkbox-focus"
                name="showcaseCheckboxFocus"
                legend="Notify channels"
                values={['email']}
                onChange={() => undefined}
                options={checkboxOptions}
              />
            </StateCard>
            <StateCard label="Radio unselected">
              <RadioGroup
                id="showcase-radio-unselected"
                name="showcaseRadioUnselected"
                legend="Resolution route"
                value=""
                onChange={() => undefined}
                options={radioOptions}
              />
            </StateCard>
            <StateCard label="Radio selected">
              <RadioGroup
                id="showcase-radio-selected"
                name="showcaseRadioSelected"
                legend="Resolution route"
                value="priority"
                onChange={() => undefined}
                options={radioOptions}
              />
            </StateCard>
            <StateCard label="Radio disabled unchecked">
              <RadioGroup
                id="showcase-radio-disabled-unchecked"
                name="showcaseRadioDisabledUnchecked"
                legend="Resolution route"
                value=""
                onChange={() => undefined}
                options={radioOptions}
                disabled
              />
            </StateCard>
            <StateCard label="Radio disabled checked">
              <RadioGroup
                id="showcase-radio-disabled-checked"
                name="showcaseRadioDisabledChecked"
                legend="Resolution route"
                value="standard"
                onChange={() => undefined}
                options={radioOptions}
                disabled
              />
            </StateCard>
            <StateCard label="Radio error">
              <FormGroup error>
                <ErrorMessage id="showcase-radio-error-message">Choose a route</ErrorMessage>
                <RadioGroup
                  id="showcase-radio-error"
                  name="showcaseRadioError"
                  legend="Resolution route"
                  value=""
                  onChange={() => undefined}
                  options={radioOptions}
                  error
                  describedBy="showcase-radio-error-message"
                />
              </FormGroup>
            </StateCard>
            <StateCard label="Radio focus representation" className="showcase-force-radio-focus">
              <RadioGroup
                id="showcase-radio-focus"
                name="showcaseRadioFocus"
                legend="Resolution route"
                value="standard"
                onChange={() => undefined}
                options={radioOptions}
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Character count"
          description="Textarea with remaining-character or word count feedback. Count message updates as the user types."
        >
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Default (under limit)">
              <CharacterCount
                id="showcase-charcount-default"
                name="showcaseCharcountDefault"
                label="Provide additional detail"
                hint="Do not include personal or financial information."
                value=""
                maxLength={200}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Partially filled">
              <CharacterCount
                id="showcase-charcount-partial"
                name="showcaseCharcountPartial"
                label="Provide additional detail"
                value="Service users reported intermittent access failures."
                maxLength={200}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Near limit (threshold)">
              <CharacterCount
                id="showcase-charcount-near"
                name="showcaseCharcountNear"
                label="Provide additional detail"
                value="The system encountered an unexpected error during the authentication flow which prevented users from completing their session correctly on mobile devices."
                maxLength={200}
                threshold={75}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Over limit (error)">
              <CharacterCount
                id="showcase-charcount-over"
                name="showcaseCharcountOver"
                label="Provide additional detail"
                value="The system encountered an unexpected error during the authentication flow which prevented users from completing their session correctly on mobile devices and this text now exceeds the maximum character limit."
                maxLength={150}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Word count mode">
              <CharacterCount
                id="showcase-charcount-words"
                name="showcaseCharcountWords"
                label="Summary"
                hint="Write a brief summary in 50 words or fewer."
                value="Service outage affecting case management portal."
                maxWords={50}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="With error message">
              <CharacterCount
                id="showcase-charcount-error"
                name="showcaseCharcountError"
                label="Provide additional detail"
                value=""
                maxLength={200}
                errorMessage="Enter additional detail"
                onChange={() => undefined}
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Date input"
          description="Grouped day/month/year fields with fieldset legend and per-field error targeting."
        >
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Empty">
              <DateInput
                id="showcase-date-empty"
                name="showcaseDateEmpty"
                legend="Date of incident"
                hint="For example, 27 3 2026"
                value={{ day: '', month: '', year: '' }}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Filled">
              <DateInput
                id="showcase-date-filled"
                name="showcaseDateFilled"
                legend="Date of incident"
                value={{ day: '15', month: '6', year: '2026' }}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Error on all fields">
              <DateInput
                id="showcase-date-error-all"
                name="showcaseDateErrorAll"
                legend="Date of incident"
                hint="For example, 27 3 2026"
                value={{ day: '', month: '', year: '' }}
                errorMessage="Enter the date of the incident"
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Error on specific fields">
              <DateInput
                id="showcase-date-error-fields"
                name="showcaseDateErrorFields"
                legend="Date of incident"
                value={{ day: '15', month: '', year: '2026' }}
                errorMessage="Date of incident must include a month"
                errorFields={['month']}
                onChange={() => undefined}
              />
            </StateCard>
            <StateCard label="Disabled">
              <DateInput
                id="showcase-date-disabled"
                name="showcaseDateDisabled"
                legend="Date of incident"
                value={{ day: '15', month: '6', year: '2026' }}
                disabled
                onChange={() => undefined}
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="File upload"
          description="File input with label, hint, validation, and multi-file support."
        >
          <div className="showcase-state-grid showcase-state-grid--form">
            <StateCard label="Default">
              <FileUpload
                id="showcase-file-default"
                name="showcaseFileDefault"
                label="Upload evidence"
                hint="Upload a PDF, JPG or PNG file under 10MB."
              />
            </StateCard>
            <StateCard label="Error">
              <FileUpload
                id="showcase-file-error"
                name="showcaseFileError"
                label="Upload evidence"
                hint="Upload a PDF, JPG or PNG file under 10MB."
                errorMessage="The selected file must be smaller than 10MB"
              />
            </StateCard>
            <StateCard label="Multiple files">
              <FileUpload
                id="showcase-file-multi"
                name="showcaseFileMulti"
                label="Upload supporting documents"
                hint="You can upload up to 5 files."
                multiple
                accept=".pdf,.jpg,.png"
              />
            </StateCard>
            <StateCard label="Disabled">
              <FileUpload
                id="showcase-file-disabled"
                name="showcaseFileDisabled"
                label="Upload evidence"
                disabled
              />
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Forms review notes"
          items={[
            'Verify error border + message + control all appear as one coherent validation state.',
            'Check focus representation against keyboard focus behaviour in real interaction.',
            'Confirm disabled controls still remain readable and not mistaken for non-rendered controls.',
            'Check there is no read-only variant in current APIs for text controls (only disabled).',
            'Confirm loading and icon+text button states are custom placeholders, not native component variants.',
            'Character count: verify the count message updates dynamically when value changes in interactive use.',
            'Character count: when over limit, check the message uses red error styling and the textarea gets error border.',
            'Date input: verify per-field error borders appear only on the targeted fields when errorFields is set.',
            'File upload: verify native browser file dialog opens on click in supported environments.',
          ]}
        />
      </div>
    );
  }

  renderTableShowcase() {
    const basicHead = [
      { text: 'Case' },
      { text: 'Status' },
      { text: 'Owner' },
      { text: 'Updated' },
      { text: 'Action' },
    ];

    const basicBody = [
      [
        { text: 'CASE-2045' },
        { content: <Tag tone="green">Open</Tag> },
        { text: 'A. Patel' },
        { text: '4 Mar 2026' },
        {
          content: (
            <a href="#">
              View<span className="govuk-visually-hidden"> case CASE-2045</span>
            </a>
          ),
        },
      ],
      [
        { text: 'CASE-2044' },
        { content: <Tag tone="blue">In review</Tag> },
        { text: 'N. Clarke' },
        { text: '3 Mar 2026' },
        {
          content: (
            <a href="#">
              View<span className="govuk-visually-hidden"> case CASE-2044</span>
            </a>
          ),
        },
      ],
      [
        { text: 'CASE-2043' },
        { content: <Tag tone="grey">Closed</Tag> },
        { text: 'S. Wong' },
        { text: '2 Mar 2026' },
        {
          content: (
            <a href="#">
              View<span className="govuk-visually-hidden"> case CASE-2043</span>
            </a>
          ),
        },
      ],
    ];

    const gdsHead = [
      { text: 'Case reference' },
      { text: 'Status' },
      { text: 'Open days', format: 'numeric' as const },
      { text: 'SLA hrs', format: 'numeric' as const },
      { text: 'Action' },
    ];

    const gdsBody = [
      [
        { text: 'CASE-2045' },
        { content: <Tag tone="green">Open</Tag> },
        { text: '3', format: 'numeric' as const },
        { text: '12', format: 'numeric' as const },
        {
          content: (
            <a href="#">
              View<span className="govuk-visually-hidden"> case CASE-2045</span>
            </a>
          ),
        },
      ],
      [
        { text: 'CASE-2044' },
        { content: <Tag tone="blue">In review</Tag> },
        { text: '8', format: 'numeric' as const },
        { text: '24', format: 'numeric' as const },
        {
          content: (
            <a href="#">
              View<span className="govuk-visually-hidden"> case CASE-2044</span>
            </a>
          ),
        },
      ],
    ];

    const longContentBody = [
      [
        { text: 'CASE-2039', classes: 'showcase-col-case' },
        {
          text:
            'Access issue affects users who authenticate using external identity provider and then return to the service portal.',
          classes: 'showcase-col-description',
        },
        { text: 'R. Shah', classes: 'showcase-col-owner' },
        { text: '1 Mar 2026', classes: 'showcase-col-updated' },
      ],
      [
        { text: 'CASE-2038', classes: 'showcase-col-case' },
        {
          text: 'Investigation paused pending supplier response.',
          classes: 'showcase-col-description',
        },
        { text: '—', classes: 'showcase-col-owner' },
        { text: '—', classes: 'showcase-col-updated' },
      ],
    ];

    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Table and summary showcase</h2>

        <Section title="Current table component patterns" description="Coverage using existing and custom table variants.">
          <div className="showcase-table-stack">
            <div>
              <h3 className="showcase-subheading">Basic text table</h3>
              <Table head={basicHead} body={basicBody} firstCellIsHeader />
            </div>
            <div>
              <h3 className="showcase-subheading">Table with caption + caption size + compact + zebra</h3>
              <Table
                caption="Cases"
                captionClasses="govuk-table__caption--m"
                head={basicHead}
                body={basicBody}
                firstCellIsHeader
                compact
                zebra
              />
            </div>
            <div>
              <h3 className="showcase-subheading">Empty state</h3>
              <Table
                caption="Cases"
                head={basicHead}
                body={[]}
                emptyMessage="No cases found for the selected filters"
              />
            </div>
          </div>
        </Section>

        <Section title="GDS-aligned semantic table comparison" description="Using Table API in GOV.UK-style semantic mode.">
          <div className="showcase-table-stack">
            <div className="showcase-table-scroll">
              <Table
                caption="Cases with row headers and numeric columns"
                captionClasses="govuk-table__caption--m"
                head={gdsHead}
                body={gdsBody}
                firstCellIsHeader
              />
            </div>

            <div className="showcase-table-scroll">
              <Table
                caption="Long content and missing values"
                head={[
                  { text: 'Case', classes: 'showcase-col-case' },
                  { text: 'Description', classes: 'showcase-col-description' },
                  { text: 'Owner', classes: 'showcase-col-owner' },
                  { text: 'Updated', classes: 'showcase-col-updated' },
                ]}
                body={longContentBody}
                firstCellIsHeader
                smallTextUntilTablet
              />
            </div>

            <div className="showcase-table-scroll">
              <table className="govuk-table">
                <caption className="govuk-table__caption">Case-management comparison: existing pattern vs GDS-aligned pattern</caption>
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th scope="col" className="govuk-table__header">Pattern</th>
                    <th scope="col" className="govuk-table__header">Example</th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  <tr className="govuk-table__row">
                    <th scope="row" className="govuk-table__header">Existing custom composition</th>
                    <td className="govuk-table__cell">
                      <Table
                        caption="Existing style"
                        head={basicHead}
                        body={basicBody}
                        captionClasses="govuk-table__caption--m"
                        compact
                        zebra
                      />
                    </td>
                  </tr>
                  <tr className="govuk-table__row">
                    <th scope="row" className="govuk-table__header">GDS-aligned composition</th>
                    <td className="govuk-table__cell">
                      <Table
                        caption="GDS-aligned style"
                        captionClasses="govuk-table__caption--m"
                        head={gdsHead}
                        body={gdsBody}
                        firstCellIsHeader
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section title="Summary list states" description="Default and empty-ish comparison.">
          <div className="showcase-state-grid">
            <StateCard label="Default summary list">
              <SummaryList
                rows={[
                  { key: 'Status', value: <Tag tone="green">Open</Tag> },
                  { key: 'Owner', value: 'A. Patel' },
                  {
                    key: 'Service',
                    value: 'Citizen support',
                    actions: <a href="#">Change<span className="govuk-visually-hidden"> service</span></a>,
                  },
                ]}
              />
            </StateCard>
            <StateCard label="Missing values">
              <SummaryList
                rows={[
                  { key: 'Status', value: '—' },
                  { key: 'Owner', value: '—' },
                ]}
              />
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Table and summary review notes"
          items={[
            'Table now supports row headers (firstCellIsHeader), numeric cell formatting, caption size classes, and dense small-text mode.',
            'Compact and zebra remain custom variants and are not core GOV.UK table patterns.',
            'Status tags are shown as indicators only; verify they are never styled as interactive controls.',
            'Check action links include context for screen readers where link text repeats.',
            'Responsive behaviour currently depends on horizontal overflow wrappers for dense tables.',
            'Selected or disabled row styles are not shown because no explicit row-state pattern exists in current component API.',
          ]}
        />
      </div>
    );
  }

  renderNavigationShowcase() {
    const { paginationPage } = this.state;
    const breadcrumbItems = [
      { text: 'Home', href: '#' },
      { text: 'Cases', href: '#' },
      { text: 'CASE-2045', isCurrent: true },
    ];

    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Navigation showcase</h2>

        <Section title="Breadcrumbs" description="Default and forced focus representation.">
          <div className="showcase-state-grid">
            <StateCard label="Default">
              <Breadcrumbs items={breadcrumbItems} />
            </StateCard>
            <StateCard label="Focus representation" className="showcase-force-link-focus">
              <Breadcrumbs items={breadcrumbItems} />
            </StateCard>
          </div>
        </Section>

        <Section title="Pagination" description="Current, disabled boundaries, and focus/hover representation.">
          <div className="showcase-state-grid">
            <StateCard label="Interactive">
              <Pagination
                currentPage={paginationPage}
                totalPages={7}
                onPageChange={this.handlePaginationChange}
              />
            </StateCard>
            <StateCard label="First page (previous disabled)">
              <Pagination currentPage={1} totalPages={5} onPageChange={() => undefined} />
            </StateCard>
            <StateCard label="Last page (next disabled)">
              <Pagination currentPage={5} totalPages={5} onPageChange={() => undefined} />
            </StateCard>
            <StateCard label="Focus representation" className="showcase-force-pagination-focus">
              <Pagination currentPage={3} totalPages={7} onPageChange={() => undefined} />
            </StateCard>
          </div>
        </Section>

        <Section title="Back link" description="Navigational link to return to the previous page. Typically placed at the top of a page.">
          <div className="showcase-state-grid">
            <StateCard label="Default">
              <BackLink href="#" />
            </StateCard>
            <StateCard label="Custom text">
              <BackLink href="#">Back to case list</BackLink>
            </StateCard>
            <StateCard label="Focus representation" className="showcase-force-link-focus">
              <BackLink href="#" />
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Navigation review notes"
          items={[
            'Check link and button focus styles are clearly visible against nearby surfaces.',
            'Check disabled previous/next controls are visually obvious and not keyboard-trappable.',
            'Pagination CSS currently uses :has selector for one hover rule; verify target browser support.',
            'Back link: confirm it renders as an anchor by default and the arrow icon appears before the text.',
          ]}
        />
      </div>
    );
  }

  renderFeedbackShowcase() {
    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Feedback &amp; status showcase</h2>

        <Section title="Tag variants" description="All supported tones for status communication.">
          <div className="showcase-tag-grid">
            <Tag>In review</Tag>
            <Tag tone="grey">Closed</Tag>
            <Tag tone="green">Open</Tag>
            <Tag tone="blue">In progress</Tag>
            <Tag tone="red">Blocked</Tag>
            <Tag tone="yellow">Warning</Tag>
            <Tag tone="orange">Resolved</Tag>
            <Tag tone="purple">Escalated</Tag>
            <Tag tone="pink">Pending approval</Tag>
          </div>
        </Section>

        <Section
          title="Notification banner"
          description="Standard and success banners for communicating important page-level messages."
        >
          <div className="showcase-state-grid">
            <StateCard label="Standard (info)">
              <NotificationBanner heading="There may be a delay in processing your application. Last updated 14 January 2026." />
            </StateCard>
            <StateCard label="Success">
              <NotificationBanner
                type="success"
                heading="Training outcome recorded"
              >
                <p>Contact <a href="#">case-admin@example.gov.uk</a> if this is not correct.</p>
              </NotificationBanner>
            </StateCard>
            <StateCard label="Custom title">
              <NotificationBanner
                titleText="Scheduled maintenance"
                heading="This service will be unavailable on Sunday 2 February 2026 between 3am and 6am."
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Panel"
          description="Confirmation panel used on success pages to give the user a reference number or confirmation heading."
        >
          <div className="showcase-state-grid">
            <StateCard label="Confirmation with reference">
              <Panel title="Application complete">
                Your reference number<br />
                <strong>HDJ-2026-AB34</strong>
              </Panel>
            </StateCard>
            <StateCard label="Heading only">
              <Panel title="Submission received" />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Error summary"
          description="Lists all validation errors at the top of a page so users can navigate directly to each problem field."
        >
          <div className="showcase-state-grid">
            <StateCard label="Multiple errors">
              <ErrorSummary
                errors={[
                  { targetId: 'full-name', text: 'Enter your full name' },
                  { targetId: 'email', text: 'Enter an email address in the correct format, like name@example.com' },
                  { targetId: 'dob-day', text: 'Date of birth must include a year' },
                ]}
              />
            </StateCard>
            <StateCard label="Single error">
              <ErrorSummary
                errors={[
                  { targetId: 'ni-number', text: 'Enter a National Insurance number in the correct format' },
                ]}
              />
            </StateCard>
            <StateCard label="Custom heading">
              <ErrorSummary
                heading="Check the following before continuing"
                description="Some required fields are incomplete."
                errors={[
                  { targetId: 'field-a', text: 'Select a case type' },
                ]}
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Warning text"
          description="Highlight important warnings with a triangular warning icon and bold text."
        >
          <div className="showcase-state-grid">
            <StateCard label="Default">
              <WarningText>You can be fined up to £5,000 if you do not register.</WarningText>
            </StateCard>
            <StateCard label="Custom icon fallback">
              <WarningText iconFallbackText="Important">The deadline for submissions is 31 March 2026. Late submissions will not be accepted.</WarningText>
            </StateCard>
          </div>
        </Section>

        <Section
          title="Phase banner"
          description="Indicate the service phase (alpha/beta) and invite feedback from users."
        >
          <div className="showcase-state-grid">
            <StateCard label="Alpha">
              <PhaseBanner tag="alpha">
                This is a new service – your <a href="#">feedback</a> will help us to improve it.
              </PhaseBanner>
            </StateCard>
            <StateCard label="Beta">
              <PhaseBanner tag="beta">
                This is a new service – your <a href="#">feedback</a> will help us to improve it.
              </PhaseBanner>
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Feedback review notes"
          items={[
            'Check status meaning is always conveyed by text, not colour alone.',
            'Check low-contrast tone combinations remain readable in your target environments.',
            'Notification banner: verify the success variant uses a green left border and role="alert".',
            'Panel: confirm heading uses white-on-green styling and is appropriately large.',
            'Error summary: verify clicking an error link moves focus to the corresponding form control in a real form.',
            'Warning text: confirm the exclamation icon is visible and the fallback text is available to screen readers.',
            'Phase banner: verify the tag renders correctly inside the banner with appropriate font size.',
          ]}
        />
      </div>
    );
  }

  renderLayoutShowcase() {
    const { filterValues } = this.state;

    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Layout and filtering showcase</h2>

        <Section title="Section component" description="Default section composition and action region.">
          <Section
            title="Inner section title"
            description="Inner section description text to verify spacing and typography."
            actions={<Button type="button" variant="secondary">Action</Button>}
          >
            <p>Section body content for layout validation.</p>
          </Section>
        </Section>

        <Section title="Filter pane" description="Selection, search, collapsible groups, and disabled option coverage.">
          <div className="showcase-filter-pane-wrap">
            <FilterPane
              title="Filter cases"
              searchable
              sections={[
                {
                  id: 'status',
                  title: 'Status',
                  collapsible: true,
                  initiallyExpanded: true,
                  options: [
                    { label: 'Open', value: 'open', count: 14 },
                    { label: 'In review', value: 'review', count: 6 },
                    { label: 'Resolved', value: 'resolved', count: 3, disabled: true },
                  ],
                },
                {
                  id: 'priority',
                  title: 'Priority',
                  collapsible: true,
                  initiallyExpanded: false,
                  options: [
                    { label: 'High', value: 'high', count: 4 },
                    { label: 'Medium', value: 'medium', count: 8 },
                    { label: 'Low', value: 'low', count: 16 },
                  ],
                },
              ]}
              selectedValues={filterValues}
              onSelectionChange={this.handleFilterChange}
              onApply={() => undefined}
              onClear={() =>
                this.setState({
                  filterValues: {
                    status: [],
                    priority: [],
                  },
                })
              }
            />
          </div>
        </Section>

        <Section
          title="Section break"
          description="Horizontal dividers for visual separation. Available in xl, l, and m sizes; can be visible (with line) or invisible (spacing only)."
        >
          <div className="showcase-state-grid">
            <StateCard label="Extra-large visible">
              <p>Content above the break</p>
              <SectionBreak size="xl" visible />
              <p>Content below the break</p>
            </StateCard>
            <StateCard label="Large visible">
              <p>Content above the break</p>
              <SectionBreak size="l" visible />
              <p>Content below the break</p>
            </StateCard>
            <StateCard label="Medium visible">
              <p>Content above the break</p>
              <SectionBreak size="m" visible />
              <p>Content below the break</p>
            </StateCard>
            <StateCard label="Invisible (spacing only)">
              <p>Content above the break</p>
              <SectionBreak size="xl" />
              <p>Content below the break — gap above is spacing only, no visible line.</p>
            </StateCard>
          </div>
        </Section>

        <Section
          title="Inset text"
          description="Indented text block with a left border, used to draw attention to quoted or supporting content."
        >
          <div className="showcase-state-grid">
            <StateCard label="Default">
              <InsetText>
                It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
              </InsetText>
            </StateCard>
            <StateCard label="Multi-paragraph">
              <InsetText>
                <p>The tribunal will consider your appeal within 28 days of receipt.</p>
                <p>You will receive written notification of the decision by post.</p>
              </InsetText>
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Layout and filter review notes"
          items={[
            'Check filter section heading and checkbox alignment at narrow widths.',
            'Check Apply/Clear button spacing and wrapping behaviour around breakpoints.',
            'Confirm nested Section usage does not create confusing heading hierarchy in real pages.',
            'Section break: verify the visible variant renders a grey horizontal rule and the invisible variant renders only spacing.',
            'Inset text: confirm the left border appears in the correct GDS blue/grey colour.',
          ]}
        />
      </div>
    );
  }

  renderDisclosureShowcase() {
    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Progressive disclosure showcase</h2>

        <Section
          title="Accordion"
          description="Vertically stacked sections that expand/collapse to reveal content. Use when users need only a subset of grouped content."
        >
          <div className="showcase-state-grid">
            <StateCard label="All collapsed (default)">
              <Accordion
                id="showcase-accordion-default"
                sections={[
                  { heading: 'Writing well for the web', children: <p>People read differently on the web than they do on paper. This means you need to write differently.</p> },
                  { heading: 'Writing well for specialists', children: <p>Even if you are writing for specialist users, your content should still be as clear as possible.</p> },
                  { heading: 'Know your audience', children: <p>Think about who is going to read your content and what they need to know.</p> },
                ]}
              />
            </StateCard>
            <StateCard label="One section expanded">
              <Accordion
                id="showcase-accordion-expanded"
                sections={[
                  { heading: 'Case details', expanded: true, children: <p>Reference HDJ-2026. Submitted 3 January 2026 by Jane Smith. Case type: standard application.</p> },
                  { heading: 'Supporting documents', summary: '3 documents attached', children: <p>Evidence pack uploaded on 5 January 2026.</p> },
                  { heading: 'Decision history', summary: 'Last updated 14 January 2026', children: <p>No decision recorded yet.</p> },
                ]}
              />
            </StateCard>
            <StateCard label="With summaries">
              <Accordion
                id="showcase-accordion-summaries"
                sections={[
                  { heading: 'Personal details', summary: 'Name, date of birth, address', children: <p>Enter the applicant\u2019s personal information.</p> },
                  { heading: 'Contact information', summary: 'Email, phone number', children: <p>Provide at least one method of contact.</p> },
                ]}
              />
            </StateCard>
          </div>
        </Section>

        <Section
          title="Details"
          description="Inline progressive disclosure for supplementary content. Users click to expand."
        >
          <div className="showcase-state-grid">
            <StateCard label="Closed (default)">
              <Details summary="Help with nationality">
                <p>If you are not sure about your nationality, try to find out from an official document like a passport or national identity card.</p>
              </Details>
            </StateCard>
            <StateCard label="Open">
              <Details summary="Help with nationality" open>
                <p>If you are not sure about your nationality, try to find out from an official document like a passport or national identity card.</p>
                <p>We need to know your nationality so we can check what countries you are allowed to work in.</p>
              </Details>
            </StateCard>
          </div>
        </Section>

        <Section
          title="Tabs"
          description="Horizontal tabbed interface for switching between related content panels. Content changes without a page reload."
        >
          <div className="showcase-state-grid">
            <StateCard label="Default (first tab active)">
              <Tabs
                id="showcase-tabs-default"
                items={[
                  { id: 'past-day', label: 'Past day', children: <p>There were <strong>2,524</strong> applications submitted in the past day.</p> },
                  { id: 'past-week', label: 'Past week', children: <p>There were <strong>16,893</strong> applications submitted in the past week.</p> },
                  { id: 'past-month', label: 'Past month', children: <p>There were <strong>72,340</strong> applications submitted in the past month.</p> },
                ]}
              />
            </StateCard>
            <StateCard label="Second tab active">
              <Tabs
                id="showcase-tabs-second"
                defaultIndex={1}
                items={[
                  { id: 'summary', label: 'Summary', children: <p>Overview of the current quarter results.</p> },
                  { id: 'details', label: 'Details', children: <p>Breakdown of case outcomes by region and category.</p> },
                  { id: 'download', label: 'Download', children: <p>Download the data as CSV or ODS.</p> },
                ]}
              />
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Disclosure review notes"
          items={[
            'Accordion: verify all sections can be opened/closed independently and focus moves to the toggled section heading.',
            'Accordion: confirm the show/hide all control toggles all sections together when enabled.',
            'Details: verify the native HTML details/summary element is used and works without JavaScript.',
            'Tabs: verify keyboard arrow-key navigation between tabs and that the tab panel updates.',
            'Tabs: check that tab content is not rendered off-screen for inactive panels (performance consideration).',
          ]}
        />
      </div>
    );
  }

  renderTaskShowcase() {
    return (
      <div className="showcase-page">
        <h2 className="showcase-page__title">Task list showcase</h2>

        <Section
          title="Task list"
          description="A list of tasks with status indicators. Used to show progress through a multi-step process."
        >
          <div className="showcase-state-grid">
            <StateCard label="Mixed states (typical)">
              <TaskList
                idPrefix="showcase-task-mixed"
                items={[
                  { title: 'Company details', href: '#', status: 'Completed', statusTagTone: 'blue' },
                  { title: 'Contact information', href: '#', status: 'Completed', statusTagTone: 'blue' },
                  { title: 'Financial evidence', href: '#', hint: 'Upload bank statements or tax returns', status: 'In progress', statusTagTone: 'blue' },
                  { title: 'Medical history', status: 'Not yet started' },
                  { title: 'Submit application', hint: 'You must complete all sections before submitting', status: 'Cannot start yet' },
                ]}
              />
            </StateCard>
            <StateCard label="All complete">
              <TaskList
                idPrefix="showcase-task-complete"
                items={[
                  { title: 'Personal details', href: '#', status: 'Completed', statusTagTone: 'blue' },
                  { title: 'Address', href: '#', status: 'Completed', statusTagTone: 'blue' },
                  { title: 'Payment', href: '#', status: 'Completed', statusTagTone: 'blue' },
                ]}
              />
            </StateCard>
            <StateCard label="All not started">
              <TaskList
                idPrefix="showcase-task-empty"
                items={[
                  { title: 'Eligibility check', status: 'Not yet started' },
                  { title: 'Provide documents', status: 'Not yet started' },
                  { title: 'Review and confirm', status: 'Not yet started' },
                ]}
              />
            </StateCard>
            <StateCard label="With hints">
              <TaskList
                idPrefix="showcase-task-hints"
                items={[
                  { title: 'Details of the nominee', hint: 'Full name, date of birth, and address', href: '#', status: 'Completed', statusTagTone: 'blue' },
                  { title: 'Your relationship to them', hint: 'How you know the nominee and for how long', status: 'Not yet started' },
                ]}
              />
            </StateCard>
          </div>
        </Section>

        <ReviewNotes
          title="Task list review notes"
          items={[
            'Verify each task status tag uses the correct tone and text is legible.',
            'Check that tasks with href render as anchor links and those without render as plain text.',
            'Confirm hint text appears below the task title and above the status.',
            'Check that the task list renders as a semantic list element (ol or ul).',
          ]}
        />
      </div>
    );
  }

  render() {
    const { pageId } = this.props;

    if (pageId === 'forms') {
      return this.renderFormsShowcase();
    }

    if (pageId === 'tables') {
      return this.renderTableShowcase();
    }

    if (pageId === 'navigation') {
      return this.renderNavigationShowcase();
    }

    if (pageId === 'feedback') {
      return this.renderFeedbackShowcase();
    }

    if (pageId === 'disclosure') {
      return this.renderDisclosureShowcase();
    }

    if (pageId === 'task') {
      return this.renderTaskShowcase();
    }

    return this.renderLayoutShowcase();
  }
}