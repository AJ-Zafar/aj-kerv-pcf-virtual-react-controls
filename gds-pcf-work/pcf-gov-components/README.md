# PCF GOV Components

A React 16.4-compatible component library implementing GOV.UK Design System patterns for Power Apps PCF (PowerApps Component Framework).

## Features

- **React 16.4 Compatible**: No hooks, no context API - pure function components
- **Plain CSS**: No CSS-in-JS, no styled-components
- **Presentation-Only**: Form controls with no side effects (props in, callbacks out)
- **GOV.UK Design System**: Follows official patterns and styling
- **TypeScript**: Full type definitions included

## Installation

```bash
npm install pcf-gov-components
```

**Peer Dependencies:**
- `react@^16.4.0`

## Usage

```tsx
import { Button, Label, TextInput, FormGroup, ErrorMessage, Hint } from 'pcf-gov-components';

// Import base styles
import 'pcf-gov-components/dist/styles/base.css';

function MyForm() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <FormGroup error={!!error}>
      <Label htmlFor="my-input">Your name</Label>
      <Hint id="name-hint">Enter your full name</Hint>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <TextInput
        id="my-input"
        name="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!!error}
        aria-describedby={error ? 'name-error name-hint' : 'name-hint'}
      />
    </FormGroup>
  );
}
```

## Components

### Batch 1 (Available)
- **Button** - Form action buttons
- **Label** - Input labels
- **Hint** - Guidance text
- **ErrorMessage** - Validation errors
- **FormGroup** - Form control wrapper
- **Section** - Content grouping

### Batch 2 (Planned)
- TextInput
- Textarea
- Select
- CheckboxGroup
- RadioGroup

## Architecture

This library follows strict constraints for PCF form control usage:

- **No API calls** - Components are presentation-only
- **No localStorage/sessionStorage** - State management is external
- **No routing** - No React Router or navigation logic
- **No telemetry** - No analytics or tracking
- **No hooks** - Compatible with React 16.4
- **Props in, callbacks out** - Controlled components only

## Documentation

- [Project Rules](docs/RULES.md) - Core constraints and principles
- [Component Checklist](docs/CHECKLIST.md) - Review checklist for new components

## License

MIT
