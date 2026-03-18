import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { FilterPaneProps, FilterSection } from './FilterPane.types';
import { TextInput } from '../TextInput/TextInput';
import './FilterPane.css';

interface FilterPaneState {
  expanded: { [sectionId: string]: boolean };
  filterText: { [sectionId: string]: string };
}

/**
 * Filter pane component for displaying filter sections with checkboxes
 */
export class FilterPane extends React.Component<FilterPaneProps, FilterPaneState> {
  constructor(props: FilterPaneProps) {
    super(props);
    this.state = {
      expanded: this.getInitialExpandedState(props.sections),
      filterText: this.getInitialFilterText(props.sections),
    };
  }

  componentDidUpdate(prevProps: FilterPaneProps) {
    if (prevProps.sections !== this.props.sections) {
      const expanded = { ...this.state.expanded };
      const filterText = { ...this.state.filterText };
      let needsUpdate = false;

      this.props.sections.forEach((section) => {
        if (expanded[section.id] === undefined) {
          expanded[section.id] = this.getSectionInitialExpanded(section);
          needsUpdate = true;
        }
        if (filterText[section.id] === undefined) {
          filterText[section.id] = '';
          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        this.setState({ expanded, filterText });
      }
    }
  }

  getInitialExpandedState(sections: FilterSection[]) {
    const expanded: { [sectionId: string]: boolean } = {};

    sections.forEach((section) => {
      expanded[section.id] = this.getSectionInitialExpanded(section);
    });

    return expanded;
  }

  getInitialFilterText(sections: FilterSection[]) {
    const filterText: { [sectionId: string]: string } = {};

    sections.forEach((section) => {
      filterText[section.id] = '';
    });

    return filterText;
  }

  getSectionInitialExpanded(section: FilterSection) {
    if (!section.collapsible) {
      return true;
    }

    return section.initiallyExpanded !== false;
  }

  handleToggleSection = (sectionId: string) => {
    this.setState((prevState) => ({
      expanded: {
        ...prevState.expanded,
        [sectionId]: !prevState.expanded[sectionId],
      },
    }));
  };

  handleFilterTextChange = (sectionId: string, value: string) => {
    this.setState((prevState) => ({
      filterText: {
        ...prevState.filterText,
        [sectionId]: value,
      },
    }));
  };

  handleOptionToggle = (sectionId: string, value: string) => {
    const { selectedValues, onSelectionChange } = this.props;
    const currentValues = selectedValues[sectionId] || [];
    const isSelected = currentValues.indexOf(value) !== -1;

    const updatedValues = isSelected
      ? currentValues.filter((item) => item !== value)
      : currentValues.concat(value);

    onSelectionChange({
      ...selectedValues,
      [sectionId]: updatedValues,
    });
  };

  renderSection(section: FilterSection) {
    const { selectedValues, searchable } = this.props;
    const isExpanded = !section.collapsible || this.state.expanded[section.id];
    const filterText = this.state.filterText[section.id] || '';
    const selectedForSection = selectedValues[section.id] || [];
    const sectionTitleId = `${section.id}-title`;

    const visibleOptions = searchable
      ? section.options.filter((option) =>
          option.label.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
        )
      : section.options;

    return (
      <div key={section.id} className="govuk-filter-pane__section">
        <div className="govuk-filter-pane__section-header">
          <h3 id={sectionTitleId} className="govuk-filter-pane__section-title">
            {section.title}
          </h3>
          {section.collapsible && (
            <button
              type="button"
              className="govuk-filter-pane__toggle"
              onClick={() => this.handleToggleSection(section.id)}
              aria-expanded={isExpanded}
              aria-controls={`${section.id}-options`}
            >
              {isExpanded ? 'Hide' : 'Show'}
            </button>
          )}
        </div>

        {searchable && (
          <div className="govuk-filter-pane__search">
            <label
              htmlFor={`${section.id}-search`}
              className="govuk-filter-pane__search-label"
            >
              Filter {section.title}
            </label>
            <TextInput
              id={`${section.id}-search`}
              name={`${section.id}-search`}
              type="text"
              value={filterText}
              onChange={(event) =>
                this.handleFilterTextChange(section.id, event.target.value)
              }
            />
          </div>
        )}

        {isExpanded && (
          <div
            id={`${section.id}-options`}
            className="govuk-filter-pane__options govuk-checkboxes"
            role="group"
            aria-labelledby={sectionTitleId}
          >
            {visibleOptions.map((option) => {
              const checkboxId = `${section.id}-${option.value}`;
              const isChecked = selectedForSection.indexOf(option.value) !== -1;

              return (
                <div key={option.value} className="govuk-checkboxes__item">
                  <input
                    id={checkboxId}
                    type="checkbox"
                    className="govuk-checkboxes__input"
                    checked={isChecked}
                    disabled={option.disabled}
                    onChange={() => this.handleOptionToggle(section.id, option.value)}
                  />
                  <label className="govuk-checkboxes__label" htmlFor={checkboxId}>
                    {option.label}
                    {typeof option.count === 'number' && (
                      <span className="govuk-filter-pane__count">
                        ({option.count})
                      </span>
                    )}
                  </label>
                </div>
              );
            })}

            {visibleOptions.length === 0 && (
              <div className="govuk-filter-pane__no-results">No options</div>
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { title, sections, onApply, onClear, className } = this.props;
    const filterPaneClasses = classNames('govuk-filter-pane', className);

    return (
      <div className={filterPaneClasses}>
        <h2 className="govuk-filter-pane__title">{title}</h2>
        {sections.map((section) => this.renderSection(section))}

        {(onApply || onClear) && (
          <div className="govuk-filter-pane__actions">
            {onApply && (
              <button
                type="button"
                className="govuk-button"
                onClick={onApply}
              >
                Apply filters
              </button>
            )}
            {onClear && (
              <button
                type="button"
                className="govuk-button govuk-button--secondary"
                onClick={onClear}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
