import * as React from 'react';
import {
  BackLink,
  Section,
  TaskList,
  Tag,
  Panel,
  NotificationBanner,
  Button,
  WarningText,
} from '../index';
import './TaskProgressExample.css';

interface TaskProgressExampleProps {
  completed?: boolean;
}

interface TaskProgressExampleState {
  submitted: boolean;
}

/**
 * Task / progress composite example
 *
 * Demonstrates a multi-step application journey using TaskList
 * with optional Panel confirmation when all tasks are complete.
 */
export class TaskProgressExample extends React.Component<
  TaskProgressExampleProps,
  TaskProgressExampleState
> {
  constructor(props: TaskProgressExampleProps) {
    super(props);
    this.state = { submitted: props.completed || false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ submitted: true });
  }

  renderInProgress() {
    return (
      <div className="example-task-page">
        <BackLink href="#">Back to dashboard</BackLink>

        <h1 className="example-task-page__heading">Register as a waste carrier</h1>
        <p className="example-task-page__body">
          You have completed <strong>2 of 5</strong> sections.
        </p>

        <NotificationBanner heading="You have 14 days to complete this application before it expires." />

        <Section title="Application tasks">
          <TaskList
            idPrefix="task-progress"
            items={[
              {
                title: 'Check eligibility',
                href: '#',
                status: 'Completed',
                statusTagTone: 'blue',
              },
              {
                title: 'Company information',
                href: '#',
                hint: 'Registered name, address, and company number',
                status: 'Completed',
                statusTagTone: 'blue',
              },
              {
                title: 'Directors and officers',
                href: '#',
                hint: 'Full names and dates of birth',
                status: 'In progress',
                statusTagTone: 'blue',
              },
              {
                title: 'Convictions',
                hint: 'Declare any relevant criminal convictions',
                status: 'Not yet started',
              },
              {
                title: 'Submit application',
                hint: 'Complete all sections before submitting',
                status: 'Cannot start yet',
              },
            ]}
          />
        </Section>

        <WarningText>
          You must complete all sections before you can submit your application.
        </WarningText>

        <div className="example-task-page__actions">
          <Button type="button" onClick={this.handleSubmit}>
            Submit application
          </Button>
          <Button type="button" variant="secondary">
            Save and come back later
          </Button>
        </div>
      </div>
    );
  }

  renderComplete() {
    return (
      <div className="example-task-page">
        <Panel title="Application complete">
          Your reference number
          <br />
          <strong>WCR-2026-KT94</strong>
        </Panel>

        <div className="example-task-page__confirmation-body">
          <p>We have sent a confirmation email to <strong>applicant@example.com</strong>.</p>

          <h2>What happens next</h2>
          <p>
            We will review your application within 10 working days. If we need
            more information we will contact you by email.
          </p>

          <Section title="Application summary">
            <TaskList
              idPrefix="task-complete"
              items={[
                { title: 'Check eligibility', status: 'Completed', statusTagTone: 'blue' },
                { title: 'Company information', status: 'Completed', statusTagTone: 'blue' },
                { title: 'Directors and officers', status: 'Completed', statusTagTone: 'blue' },
                { title: 'Convictions', status: 'Completed', statusTagTone: 'blue' },
                { title: 'Submit application', status: 'Completed', statusTagTone: 'blue' },
              ]}
            />
          </Section>

          <p>
            Current status: <Tag tone="green">Submitted</Tag>
          </p>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.submitted) {
      return this.renderComplete();
    }
    return this.renderInProgress();
  }
}
