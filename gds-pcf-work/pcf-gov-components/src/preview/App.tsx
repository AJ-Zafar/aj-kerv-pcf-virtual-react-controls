import * as React from 'react';
import {
  SHOWCASE_PAGES,
  ShowcaseIndexPage,
  ShowcasePage,
  ShowcasePageId,
  ListPageExample,
  FormPageExample,
  SummaryPageExample,
  TaskProgressExample,
  UploadFlowExample,
} from '../examples';
import './App.css';

interface AppState {
  activeView: ShowcasePageId;
  selectedCase: string | null;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    activeView: 'index',
    selectedCase: null,
  };

  showView = (activeView: ShowcasePageId) => {
    this.setState({ activeView });
  };

  handleViewCase = (caseRef: string) => {
    this.setState({ activeView: 'summary-example', selectedCase: caseRef });
  };

  renderActiveView() {
    const { activeView, selectedCase } = this.state;

    if (activeView === 'index') {
      return <ShowcaseIndexPage onNavigate={this.showView} />;
    }

    if (activeView === 'form-example') {
      return <FormPageExample />;
    }

    if (activeView === 'summary-example') {
      return <SummaryPageExample caseRef={selectedCase} />;
    }

    if (activeView === 'list-example') {
      return <ListPageExample onViewCase={this.handleViewCase} />;
    }

    if (activeView === 'task-example') {
      return <TaskProgressExample />;
    }

    if (activeView === 'upload-example') {
      return <UploadFlowExample />;
    }

    return <ShowcasePage pageId={activeView} />;
  }

  render() {
    const { activeView } = this.state;

    return (
      <div className="preview-app">
        <header className="preview-app__header">
          <h1 className="preview-app__title">PCF GOV Components Preview</h1>
          <p className="preview-app__subtitle">
            Component showcase and QA surface for visual inspection and future PCF alignment.
          </p>
        </header>

        <div className="preview-app__layout">
          <aside className="preview-app__sidebar" aria-label="Showcase navigation">
            <button
              type="button"
              className={
                activeView === 'index'
                  ? 'preview-app__nav-link preview-app__nav-link--active'
                  : 'preview-app__nav-link'
              }
              onClick={() => this.showView('index')}
            >
              Showcase index
            </button>

            <h2 className="preview-app__nav-heading">Component showcase pages</h2>
            {SHOWCASE_PAGES.slice(0, 7).map((page) => (
              <button
                key={page.id}
                type="button"
                className={
                  activeView === page.id
                    ? 'preview-app__nav-link preview-app__nav-link--active'
                    : 'preview-app__nav-link'
                }
                onClick={() => this.showView(page.id)}
              >
                {page.title}
              </button>
            ))}

            <h2 className="preview-app__nav-heading">Composite examples</h2>
            {SHOWCASE_PAGES.slice(7).map((page) => (
              <button
                key={page.id}
                type="button"
                className={
                  activeView === page.id
                    ? 'preview-app__nav-link preview-app__nav-link--active'
                    : 'preview-app__nav-link'
                }
                onClick={() => this.showView(page.id)}
              >
                {page.title}
              </button>
            ))}
          </aside>

          <main className="preview-app__content">{this.renderActiveView()}</main>
        </div>
      </div>
    );
  }
}
