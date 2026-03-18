import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { TabsProps } from './Tabs.types';
import './Tabs.css';

/**
 * Tabs component for switching between related content sections.
 * Follows GOV.UK Design System tabs pattern.
 *
 * Uses a class component because React 16.4 does not support hooks.
 * On mobile, degrades gracefully to a stacked list of sections.
 */
export class Tabs extends React.Component<TabsProps, { selectedIndex: number }> {
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      selectedIndex: props.defaultIndex || 0
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleTabClick(index: number, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    this.setState({ selectedIndex: index });
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    var items = this.props.items;
    var current = this.state.selectedIndex;
    var next = current;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      next = (current + 1) % items.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      next = (current - 1 + items.length) % items.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      next = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      next = items.length - 1;
    }

    if (next !== current) {
      this.setState({ selectedIndex: next });
      if (this.props.onChange) {
        this.props.onChange(next);
      }
      // Focus the new tab
      var tabEl = document.getElementById(this.getTabId(next));
      if (tabEl) {
        tabEl.focus();
      }
    }
  }

  getTabId(index: number): string {
    var item = this.props.items[index];
    var prefix = this.props.idPrefix || 'tab';
    return item.id ? item.id + '-tab' : prefix + '-' + index + '-tab';
  }

  getPanelId(index: number): string {
    var item = this.props.items[index];
    var prefix = this.props.idPrefix || 'tab';
    return item.id || prefix + '-' + index;
  }

  render() {
    var items = this.props.items;
    var title = this.props.title || 'Contents';
    var className = this.props.className;
    var id = this.props.id;
    var selectedIndex = this.state.selectedIndex;
    var self = this;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div
        id={id}
        className={classNames('govuk-tabs', 'govuk-tabs--js-enabled', className)}
      >
        <h2 className="govuk-tabs__title">{title}</h2>

        <ul
          className="govuk-tabs__list"
          role="tablist"
          onKeyDown={self.handleKeyDown}
        >
          {items.map(function (item, index) {
            var isSelected = index === selectedIndex;
            var tabId = self.getTabId(index);
            var panelId = self.getPanelId(index);

            return (
              <li
                key={panelId}
                className={classNames(
                  'govuk-tabs__list-item',
                  isSelected && 'govuk-tabs__list-item--selected'
                )}
                role="presentation"
              >
                <a
                  id={tabId}
                  className="govuk-tabs__tab"
                  href={'#' + panelId}
                  role="tab"
                  aria-selected={isSelected ? 'true' : 'false'}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={function (e: React.MouseEvent<HTMLAnchorElement>) {
                    self.handleTabClick(index, e);
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {items.map(function (item, index) {
          var isSelected = index === selectedIndex;
          var panelId = self.getPanelId(index);
          var tabId = self.getTabId(index);

          return (
            <div
              key={panelId}
              id={panelId}
              className={classNames(
                'govuk-tabs__panel',
                !isSelected && 'govuk-tabs__panel--hidden'
              )}
              role="tabpanel"
              aria-labelledby={tabId}
              tabIndex={0}
            >
              {item.children}
            </div>
          );
        })}
      </div>
    );
  }
}
