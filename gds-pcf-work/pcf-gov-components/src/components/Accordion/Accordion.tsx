import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { AccordionProps } from './Accordion.types';
import './Accordion.css';

interface AccordionState {
  expandedSections: boolean[];
}

/**
 * Accordion component for collapsible content sections.
 * Follows GOV.UK Design System accordion pattern.
 * Uses a class component because React 16.4 does not support hooks.
 */
export class Accordion extends React.Component<AccordionProps, AccordionState> {
  constructor(props: AccordionProps) {
    super(props);

    var initial: boolean[] = [];
    for (var i = 0; i < props.sections.length; i++) {
      initial.push(!!props.sections[i].expanded);
    }

    this.state = { expandedSections: initial };
    this.handleToggleSection = this.handleToggleSection.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
  }

  handleToggleSection(index: number) {
    var current = this.state.expandedSections.slice();
    current[index] = !current[index];
    this.setState({ expandedSections: current });
    if (this.props.onToggle) {
      this.props.onToggle(index, current[index]);
    }
  }

  handleToggleAll() {
    var allExpanded = this.areAllExpanded();
    var next: boolean[] = [];
    for (var i = 0; i < this.state.expandedSections.length; i++) {
      next.push(!allExpanded);
    }
    this.setState({ expandedSections: next });
  }

  areAllExpanded(): boolean {
    var sections = this.state.expandedSections;
    for (var i = 0; i < sections.length; i++) {
      if (!sections[i]) return false;
    }
    return true;
  }

  render() {
    var sections = this.props.sections;
    var id = this.props.id || 'accordion';
    var headingLevel = this.props.headingLevel || 2;
    var showAllText = this.props.showAllText || 'Show all sections';
    var hideAllText = this.props.hideAllText || 'Hide all sections';
    var showAllEnabled = this.props.showAllEnabled !== false;
    var className = this.props.className;
    var expandedSections = this.state.expandedSections;
    var allExpanded = this.areAllExpanded();
    var self = this;

    var HeadingTag = ('h' + headingLevel) as keyof JSX.IntrinsicElements;

    return (
      <div
        id={id}
        className={classNames('govuk-accordion', className)}
      >
        {showAllEnabled && (
          <button
            type="button"
            className="govuk-accordion__show-all"
            aria-expanded={allExpanded ? 'true' : 'false'}
            onClick={self.handleToggleAll}
          >
            <span className={classNames(
              'govuk-accordion-nav__chevron',
              !allExpanded && 'govuk-accordion-nav__chevron--down'
            )} />
            <span className="govuk-accordion__show-all-text">
              {allExpanded ? hideAllText : showAllText}
            </span>
          </button>
        )}

        {sections.map(function (section, index) {
          var isExpanded = !!expandedSections[index];
          var sectionId = id + '-section-' + index;
          var headingId = sectionId + '-heading';
          var contentId = sectionId + '-content';

          return (
            <div
              key={index}
              className={classNames(
                'govuk-accordion__section',
                isExpanded && 'govuk-accordion__section--expanded'
              )}
            >
              <div className="govuk-accordion__section-header">
                <HeadingTag className="govuk-accordion__section-heading">
                  <button
                    type="button"
                    id={headingId}
                    className="govuk-accordion__section-button"
                    aria-controls={contentId}
                    aria-expanded={isExpanded ? 'true' : 'false'}
                    onClick={function () { self.handleToggleSection(index); }}
                  >
                    <span className="govuk-accordion__section-heading-text">
                      <span className="govuk-accordion__section-heading-text-focus">
                        {section.heading}
                      </span>
                    </span>

                    {section.summary && (
                      <span className="govuk-accordion__section-summary govuk-body">
                        <span className="govuk-accordion__section-summary-focus">
                          {section.summary}
                        </span>
                      </span>
                    )}

                    <span className="govuk-accordion__section-toggle">
                      <span className="govuk-accordion__section-toggle-focus">
                        <span className={classNames(
                          'govuk-accordion-nav__chevron',
                          !isExpanded && 'govuk-accordion-nav__chevron--down'
                        )} />
                        <span className="govuk-accordion__section-toggle-text">
                          {isExpanded ? 'Hide' : 'Show'}
                        </span>
                      </span>
                    </span>
                  </button>
                </HeadingTag>
              </div>

              <div
                id={contentId}
                className={classNames(
                  'govuk-accordion__section-content',
                  !isExpanded && 'govuk-accordion__section-content--hidden'
                )}
                role="region"
                aria-labelledby={headingId}
              >
                {section.children}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
