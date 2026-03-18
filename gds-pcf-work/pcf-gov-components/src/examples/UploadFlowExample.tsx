import * as React from 'react';
import {
  BackLink,
  Section,
  FileUpload,
  ErrorSummary,
  Panel,
  Button,
  InsetText,
  Tag,
} from '../index';
import './UploadFlowExample.css';

interface UploadFlowExampleState {
  step: 'upload' | 'error' | 'success';
}

/**
 * Upload flow composite example
 *
 * Demonstrates a file upload journey with validation,
 * error summary, and confirmation panel.
 */
export class UploadFlowExample extends React.Component<{}, UploadFlowExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { step: 'upload' };
    this.handleShowError = this.handleShowError.bind(this);
    this.handleShowSuccess = this.handleShowSuccess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleShowError() {
    this.setState({ step: 'error' });
  }

  handleShowSuccess() {
    this.setState({ step: 'success' });
  }

  handleReset() {
    this.setState({ step: 'upload' });
  }

  renderUploadStep() {
    return (
      <div className="example-upload-page">
        <BackLink href="#" onClick={this.handleReset}>
          Back
        </BackLink>

        <h1 className="example-upload-page__heading">Upload supporting evidence</h1>

        <InsetText>
          Files must be PDF, JPG, or PNG and no larger than 10MB each.
          You can upload up to 3 files.
        </InsetText>

        <Section title="Select files">
          <FileUpload
            id="upload-evidence"
            name="uploadEvidence"
            label="Choose a file"
            labelIsHeading={false}
            hint="Upload a PDF, JPG or PNG file under 10MB."
            accept=".pdf,.jpg,.png"
          />
        </Section>

        <div className="example-upload-page__actions">
          <Button type="button" onClick={this.handleShowError}>
            Upload file (show error)
          </Button>
          <Button type="button" variant="secondary" onClick={this.handleShowSuccess}>
            Upload file (show success)
          </Button>
        </div>
      </div>
    );
  }

  renderErrorStep() {
    return (
      <div className="example-upload-page">
        <BackLink href="#" onClick={this.handleReset}>
          Back
        </BackLink>

        <ErrorSummary
          errors={[
            { targetId: 'upload-evidence', text: 'The selected file must be smaller than 10MB' },
            { targetId: 'upload-evidence', text: 'The selected file must be a PDF, JPG or PNG' },
          ]}
        />

        <h1 className="example-upload-page__heading">Upload supporting evidence</h1>

        <InsetText>
          Files must be PDF, JPG, or PNG and no larger than 10MB each.
          You can upload up to 3 files.
        </InsetText>

        <Section title="Select files">
          <FileUpload
            id="upload-evidence"
            name="uploadEvidence"
            label="Choose a file"
            labelIsHeading={false}
            hint="Upload a PDF, JPG or PNG file under 10MB."
            errorMessage="The selected file must be smaller than 10MB"
            accept=".pdf,.jpg,.png"
          />
        </Section>

        <div className="example-upload-page__actions">
          <Button type="button" onClick={this.handleShowSuccess}>
            Try again (show success)
          </Button>
        </div>
      </div>
    );
  }

  renderSuccessStep() {
    return (
      <div className="example-upload-page">
        <Panel title="File uploaded successfully">
          Evidence reference
          <br />
          <strong>EVD-2026-0042</strong>
        </Panel>

        <div className="example-upload-page__confirmation-body">
          <p>Your file has been uploaded and attached to the case.</p>

          <Section title="Uploaded files">
            <table className="example-upload-page__file-table">
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>bank-statement-jan-2026.pdf</td>
                  <td><Tag tone="green">Uploaded</Tag></td>
                </tr>
                <tr>
                  <td>photo-id.jpg</td>
                  <td><Tag tone="green">Uploaded</Tag></td>
                </tr>
              </tbody>
            </table>
          </Section>

          <div className="example-upload-page__actions">
            <Button type="button" onClick={this.handleReset}>
              Upload another file
            </Button>
            <Button type="button" variant="secondary">
              Return to case
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    var step = this.state.step;

    if (step === 'error') {
      return this.renderErrorStep();
    }

    if (step === 'success') {
      return this.renderSuccessStep();
    }

    return this.renderUploadStep();
  }
}
