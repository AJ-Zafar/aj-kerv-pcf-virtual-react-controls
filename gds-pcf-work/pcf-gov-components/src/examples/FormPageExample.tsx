import * as React from 'react';
import {
  Section,
  FormGroup,
  Label,
  Hint,
  ErrorMessage,
  TextInput,
  Textarea,
  Select,
  CheckboxGroup,
  RadioGroup,
  Button,
} from '../index';
import './FormPageExample.css';

interface FormPageExampleState {
  caseReference: string;
  description: string;
  category: string;
  urgency: string;
  notifyTeams: string[];
  resolution: string;
}

export class FormPageExample extends React.Component<{}, FormPageExampleState> {
  state: FormPageExampleState = {
    caseReference: '',
    description: '',
    category: '',
    urgency: 'medium',
    notifyTeams: ['security'],
    resolution: 'email',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      FormPageExampleState,
      'caseReference' | 'urgency' | 'resolution'
    >);
  };

  handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ category: event.target.value });
  };

  handleNotifyTeamsChange = (values: string[]) => {
    this.setState({ notifyTeams: values });
  };

  handleResolutionChange = (value: string) => {
    this.setState({ resolution: value });
  };

  render() {
    const { caseReference, description, category, urgency, notifyTeams, resolution } =
      this.state;

    const caseReferenceError = caseReference.trim() === '';
    const categoryError = category.trim() === '';

    const caseReferenceHintId = 'case-reference-hint';
    const caseReferenceErrorId = 'case-reference-error';
    const caseReferenceDescribedBy = `${caseReferenceHintId} ${caseReferenceErrorId}`;

    const categoryHintId = 'category-hint';
    const categoryErrorId = 'category-error';
    const categoryDescribedBy = `${categoryHintId} ${categoryErrorId}`;

    return (
      <div className="example-form-page">
        <Section
          title="Create a case"
          description="Record a new case for follow-up and triage."
        >
          <div className="example-form-page__intro">
            Complete the details below to create a new case record.
          </div>
          <form className="example-form-page__form">
            <div className="example-form-page__panel">
              <div className="example-form-page__group">
                <FormGroup error={caseReferenceError}>
                  <Label htmlFor="caseReference">Case reference</Label>
                  <Hint id={caseReferenceHintId}>
                    Use the reference from the intake request.
                  </Hint>
                  {caseReferenceError && (
                    <ErrorMessage id={caseReferenceErrorId}>
                      Enter a case reference
                    </ErrorMessage>
                  )}
                  <TextInput
                    id="caseReference"
                    name="caseReference"
                    value={caseReference}
                    onChange={this.handleInputChange}
                    describedBy={caseReferenceDescribedBy}
                    error={caseReferenceError}
                  />
                </FormGroup>
              </div>

              <div className="example-form-page__group">
                <FormGroup>
                  <Label htmlFor="description">Case description</Label>
                  <Hint id="description-hint">Summarise the issue and context.</Hint>
                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.handleTextareaChange}
                    describedBy="description-hint"
                    rows={5}
                  />
                </FormGroup>
              </div>

              <div className="example-form-page__grid">
                <div className="example-form-page__group">
                  <FormGroup error={categoryError}>
                    <Label htmlFor="category">Category</Label>
                    <Hint id={categoryHintId}>Select the case category.</Hint>
                    {categoryError && (
                      <ErrorMessage id={categoryErrorId}>
                        Choose a category
                      </ErrorMessage>
                    )}
                    <Select
                      id="category"
                      name="category"
                      value={category}
                      onChange={this.handleSelectChange}
                      describedBy={categoryDescribedBy}
                      error={categoryError}
                    >
                      <option value="">Select</option>
                      <option value="access">Access request</option>
                      <option value="incident">Service incident</option>
                      <option value="permit">Permit request</option>
                    </Select>
                  </FormGroup>
                </div>

                <div className="example-form-page__group">
                  <FormGroup>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select
                      id="urgency"
                      name="urgency"
                      value={urgency}
                      onChange={this.handleSelectChange}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </Select>
                  </FormGroup>
                </div>
              </div>

              <div className="example-form-page__group">
                <FormGroup>
                  <CheckboxGroup
                    id="notify-teams"
                    name="notifyTeams"
                    legend="Notify teams"
                    values={notifyTeams}
                    onChange={this.handleNotifyTeamsChange}
                    options={[
                      { value: 'security', label: 'Security operations' },
                      { value: 'service', label: 'Service desk' },
                      { value: 'legal', label: 'Legal' },
                    ]}
                  />
                </FormGroup>
              </div>

              <div className="example-form-page__group">
                <FormGroup>
                  <RadioGroup
                    id="resolution"
                    name="resolution"
                    legend="Preferred resolution"
                    value={resolution}
                    onChange={this.handleResolutionChange}
                    options={[
                      { value: 'email', label: 'Email summary' },
                      { value: 'call', label: 'Follow-up call' },
                      { value: 'visit', label: 'Site visit' },
                    ]}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="example-form-page__actions">
              <Button type="submit">Save case</Button>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </Section>
      </div>
    );
  }
}
