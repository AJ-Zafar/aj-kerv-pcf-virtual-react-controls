# Component Development Checklist

Use this checklist when creating or reviewing components.

## Structure
- [ ] Component follows the standard file structure (ComponentName.tsx, ComponentName.types.ts, ComponentName.css, index.ts)
- [ ] Component is exported from src/index.ts
- [ ] Types are properly defined in .types.ts file

## React Compatibility
- [ ] Component uses React 16.4 compatible syntax
- [ ] No hooks are used
- [ ] No React context is used
- [ ] Function components are used unless local UI state is needed
- [ ] Class components are only used when genuinely necessary

## Props & Data Flow
- [ ] All data comes in through props
- [ ] All user interactions go out through callbacks
- [ ] No API calls or network requests
- [ ] No localStorage/sessionStorage usage
- [ ] Component is purely presentational

## Dependencies & Imports
- [ ] No third-party dependencies added without approval
- [ ] No unused imports
- [ ] No fetch, axios, or HTTP libraries
- [ ] No routing libraries
- [ ] No styled-components or CSS-in-JS

## Styling
- [ ] Plain CSS only (no CSS-in-JS)
- [ ] Styles follow GOV.UK Design System patterns
- [ ] BEM naming convention or similar used
- [ ] No unnecessary CSS bloat

## Accessibility
- [ ] Proper labels for form controls
- [ ] aria-describedby used for hints and errors
- [ ] fieldset/legend used for grouped controls
- [ ] Keyboard navigation works correctly
- [ ] Error and hint IDs wired correctly
- [ ] Semantic HTML used

## Code Quality
- [ ] Component is simple and focused
- [ ] Minimal internal state
- [ ] No hidden side effects
- [ ] No telemetry or tracking
- [ ] Bundle size consideration
- [ ] Code is readable and maintainable

## GOV.UK Alignment
- [ ] Markup matches GOV.UK Frontend structure
- [ ] Design patterns follow GOV.UK guidance
- [ ] Component is suitable for Power Apps PCF usage
