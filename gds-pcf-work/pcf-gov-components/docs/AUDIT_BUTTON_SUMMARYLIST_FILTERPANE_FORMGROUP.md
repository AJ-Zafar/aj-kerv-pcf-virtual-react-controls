# CSS & Accessibility Audit: Button, SummaryList, FilterPane, FormGroup

**Canonical source:** govuk-frontend v6.1.0 (`_colours-palette.scss` new brand colours)  
**Date:** Session audit  

---

## 1. Button (`Button.css`)

### CSS Issues Fixed

| Property | Was (legacy) | Now (canonical) | Source |
|---|---|---|---|
| `background-color` (primary) | `#00703c` | `#0f7a52` | `govuk-colour("green")` primary |
| `box-shadow` (primary) | `0 2px 0 #002d18` | `0 2px 0 #083d29` | `green` shade-50 |
| `:hover` (primary) | `#005a30` | `#0b5c3e` | `green` shade-25 |
| `background-color` (secondary) | `#f3f2f1` | `#f3f3f3` | `black` tint-95 |
| `box-shadow` (secondary) | `0 2px 0 #929191` | `0 2px 0 #858686` | `black` tint-50 |
| `:hover` (secondary) | `#dbdad9` | `#cecece` | `black` tint-80 |
| `background-color` (warning) | `#d4351c` | `#ca3535` | `govuk-colour("red")` primary |
| `box-shadow` (warning) | `0 2px 0 #55150b` | `0 2px 0 #651b1b` | `red` shade-50 |
| `:hover` (warning) | `#aa2a16` | `#982828` | `red` shade-25 |
| `disabled[disabled]:hover` | Combined selector | Split: opacity separate from bg reset | Matches canonical structure |
| `font-smoothing` | **Missing** | Added `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale` | `govuk-font()` mixin |
| Responsive font-size | **Missing** (hardcoded 1rem) | `1rem` mobile → `1.1875rem` tablet at `40.0625em` | `govuk-font($size: 19)` |
| `margin-bottom` | `20px` / `30px` | `22px` / `32px` (includes 2px shadow adjustment) | `govuk-responsive-margin(6) + $button-shadow-size` |
| Two separate `@media` blocks | Duplicate breakpoint queries | Merged into single `@media` block | DRY |

### New Variants Added

- **`--inverse`**: White background, brand text colour, blue tint-95 hover — for dark backgrounds
- **`--start`**: Bold weight, font-size 24 (1.125rem→1.5rem), `inline-flex` + `justify-content: center`
- **`__start-icon`**: Chevron icon with responsive margin-left (5px→10px at desktop)

### Accessibility Notes

- `aria-disabled` already set on disabled buttons ✅
- Focus state uses `outline: 3px solid transparent` for Windows High Contrast Mode (WHCM) ✅
- `::before` pseudo-element expands click target to include shadow area ✅
- `:focus:not(:active):not(:hover)` ensures visible focus ring doesn't interfere with hover/active ✅

---

## 2. SummaryList (`SummaryList.css`)

### CSS Issues Fixed

| Property | Was | Now | Source |
|---|---|---|---|
| Row border colour | `#b1b4b6` (pre-brand mid-grey) | `#cecece` | `govuk-functional-colour(border)` = `black` tint-80 |
| Tablet padding (key/value/actions) | `13px 0` | `10px` top/bottom, `20px` right | `govuk-spacing(2)` = 10px, `govuk-spacing(4)` = 20px |
| Key/value/actions structure | Each had its own `padding`/`display: table-cell` | Unified shared rule for all three cells, individual overrides only for width/text-align | Matches canonical selector grouping |
| Value `width: 50%` | Hardcoded | **Removed** — canonical does not set value width, it fills remaining space | Canonical omits width for value |
| `font-smoothing` | **Missing** | Added | `govuk-font()` mixin |
| Extra rule `.govuk-form-group--error > :first-child` | Present | **Removed** (not in canonical) | Not in `_form-group.scss` |

### New Features Added

- **`--no-border` modifier** (list-level): Removes all row borders, adds 1px compensating padding
- **`--no-border` modifier** (row-level): Per-row border removal with padding compensation
- **Actions list with pipe separators**: Full `__actions-list` / `__actions-list-item` support with mobile (right border) and desktop (left border) pipe separators
- **`noBorder` prop** on `SummaryListProps` and `SummaryListRow`

### Accessibility Notes

- Uses semantic `<dl>` / `<dt>` / `<dd>` structure ✅
- `overflow-wrap: break-word` prevents content overflow ✅
- Table-cell layout at tablet+ provides visual alignment without ARIA table roles ✅

---

## 3. FilterPane (`FilterPane.css`)

### CSS Issues Fixed

| Property | Was | Now | Source |
|---|---|---|---|
| Section border colour | `#d8d8d8` (not in palette) | `#cecece` | `black` tint-80 (standard border) |
| Actions border colour | `#d8d8d8` | `#cecece` | Same |
| Title margin | `18px` | `20px` | `govuk-spacing(4)` |
| Section padding | `16px 0` | `15px 0` | `govuk-spacing(3)` |
| Section header margin-bottom | `12px` | `10px` | `govuk-spacing(2)` |
| Toggle font-size | `0.95rem` (arbitrary) | `1rem` → `1.1875rem` responsive | `govuk-font($size: 19)` |
| Search label font-size | `0.9rem` (arbitrary) | `1rem` → `1.1875rem` responsive | `govuk-font($size: 19)` |
| Checkbox label font-size | `0.95rem` | `1rem` → `1.1875rem` responsive | Standard typography scale |
| Count font-size | `0.9rem` | `1rem` → `1.1875rem` responsive | Typography scale |
| Count margin-left | `6px` | `5px` | `govuk-spacing(1)` |
| Search margin-bottom | `12px` | `10px` | `govuk-spacing(2)` |
| Search label margin-bottom | `6px` | `5px` | `govuk-spacing(1)` |
| No-results padding | `8px 0` | `10px 0` | `govuk-spacing(2)` |
| Actions padding-top | `16px` | `15px` | `govuk-spacing(3)` |
| `font-smoothing` | **Missing** | Added | Standard GOV.UK typography |
| Title responsive font-size | **Missing** | Added `1.5rem` at tablet | `govuk-font-size($size: 24)` |
| Section title responsive | **Missing** | Added `1.1875rem` at tablet | govuk-font($size: 19) |
| Checkbox item margin | `8px` | `10px` | `govuk-spacing(2)` |

### Toggle Button Focus States Added

- `:hover` — colour `#003078`, thick underline with `max(3px, ...)`, skip-ink disabled
- `:focus` — `outline: 3px solid transparent`, yellow background (`#fd0`), black bottom shadow (matches govuk-link focus)
- `:active` — colour `#0b0c0c`
- Added `font-family: inherit` for consistent rendering

### Accessibility Notes

- Toggle already has `aria-expanded` and `aria-controls` ✅
- Options group uses `role="group"` with `aria-labelledby` ✅
- Added focus styles make keyboard navigation visible (previously toggle had **no** `:focus` style — WCAG 2.4.7 violation) 🔧

---

## 4. FormGroup (`FormGroup.css`)

### CSS Issues Fixed

| Property | Was | Now | Source |
|---|---|---|---|
| Error border colour | `#d4351c` (pre-brand) | `#ca3535` | `govuk-functional-colour(error)` = `govuk-colour("red")` |
| Rule `.govuk-form-group--error > :first-child { margin-top: 0 }` | Present | **Removed** | Not in canonical `_form-group.scss` |

### Already Correct ✅

- `margin-bottom: 20px` → `30px` responsive — matches `govuk-responsive-margin(6)`
- `padding-left: 15px` — matches `govuk-spacing(3)`
- `border-left: 5px` — matches `$govuk-border-width`
- Nested form-group reset (`padding: 0; border: 0`) ✅
- Clearfix `::after` ✅

### Accessibility Notes

- Error state uses visible left border (perceivable without colour alone) ✅
- Error message text should be associated via `aria-describedby` on the form control (responsibility of parent component) ✅

---

## Global Error Colour Update

All components using the legacy error red `#d4351c` were updated to the new brand palette `#ca3535`:

| Component | Property | Old | New |
|---|---|---|---|
| ErrorMessage.css | `color` | `#d4351c` | `#ca3535` |
| FormGroup.css | `border-left-color` | `#d4351c` | `#ca3535` |
| TextInput.css | `border` (error) | `#d4351c` | `#ca3535` |
| Textarea.css | `border` (error) | `#d4351c` | `#ca3535` |
| Select.css | `border` (error) | `#d4351c` | `#ca3535` |

---

## Files Modified

- `src/components/Button/Button.css` — Full colour update + responsive font + font-smoothing + new variants
- `src/components/Button/Button.tsx` — Added inverse/start variant support
- `src/components/Button/Button.types.ts` — Extended variant union type
- `src/components/SummaryList/SummaryList.css` — Border colour + padding fix + no-border modifiers + actions-list
- `src/components/SummaryList/SummaryList.tsx` — Added noBorder prop
- `src/components/SummaryList/SummaryList.types.ts` — Added noBorder to row and list props
- `src/components/FilterPane/FilterPane.css` — All sizes to spacing scale + border colour + responsive fonts + focus states
- `src/components/FormGroup/FormGroup.css` — Error colour + removed non-canonical rule
- `src/components/ErrorMessage/ErrorMessage.css` — Error colour update
- `src/components/TextInput/TextInput.css` — Error colour update
- `src/components/Textarea/Textarea.css` — Error colour update
- `src/components/Select/Select.css` — Error colour update
- `src/components/Table/index.ts` — Fixed stale type export
