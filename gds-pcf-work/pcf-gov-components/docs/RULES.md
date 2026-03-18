React 16.4-compatible GOV-style component library for Power Apps PCF.

Hard rules:
- React 16.4 only
- No hooks
- No React context
- No API calls
- No fetch
- No axios
- No localStorage/sessionStorage
- No telemetry
- No routing libraries
- No styled-components
- No CSS-in-JS
- No unnecessary imports
- No third-party dependencies unless explicitly approved
- All business data comes in through props
- All user interactions go out through callbacks only
- Components must be presentation-focused
- Minimal internal state only for tiny UI concerns like expand/collapse
- Prefer simple function components compatible with React 16.4
- Use class components only if local UI state is genuinely needed
- Output semantic accessible HTML
- Keep markup and behaviour simple
- Plain CSS only
- Keep bundle size small
- Do not generate network calls or hidden side effects
- Do not import anything that is not used

Accessibility:
- Proper labels
- aria-describedby where relevant
- fieldset/legend for grouped controls
- keyboard-safe interactive elements
- error and hint IDs wired correctly

Component shape:
- ComponentName.tsx
- ComponentName.types.ts
- ComponentName.css
- index.ts

Design intent:
- Use GOV.UK Frontend as the source of truth for structure and design patterns
- Use govuk-react only as a React reference
- Build thin, prop-driven components suitable for Power Apps PCF
