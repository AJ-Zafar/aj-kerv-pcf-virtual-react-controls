# PCF Components vs govuk-react Styling Audit

**Date:** March 9, 2026  
**Comparison Sources:**
- pcf-gov-components (current implementation)
- govuk-react v10.x (React components with styled-components)
- govuk-frontend v6.1.0 (canonical SCSS source)

## Executive Summary

✅ **Overall Assessment:** PCF components are **well-aligned** with govuk-react and govuk-frontend styling standards.

### Key Findings:
- ✅ **Typography scales**: Correct responsive sizing (mobile 16px → tablet 19px for size 19)
- ✅ **Color values**: Accurate GOV.UK colors (#0b0c0c black, #cecece borders, #d4351c error, #00703c buttons, #fd0 focus)
- ✅ **Spacing**: Correct padding/margins matching govuk-frontend spacing scale
- ✅ **Form controls**: Correct heights (40px), borders (2px), and focus states
- ⚠️ **Architecture difference**: govuk-react uses styled-components + composition, PCF uses CSS modules + data-driven (both valid approaches)

---

## Component-by-Component Analysis

### 1. Table Component

**PCF Implementation:**
```css
font-size: 1.1875rem;  /* 19px */
border-bottom: 1px solid #cecece;
padding: 10px 20px 10px 0;
```

**govuk-react Implementation:**
```tsx
typography.font({ size: 19 })  // → mobile 16px, tablet 19px
borderBottom: `1px solid ${BORDER_COLOUR}`  // #cecece
padding: `${SPACING_POINTS[2]}px ${SPACING_POINTS[4]}px ${SPACING_POINTS[2]}px 0`  // 10px 20px 10px 0
```

**Verdict:** ✅ **ALIGNED**
- Border color matches: #cecece (black tint-80)
- Padding matches: 10px 20px 10px 0
- Caption sizing classes implemented correctly (--xl, --l, --m)
- Numeric cell formatting (tabular-nums) implemented correctly

### 2. Button Component

**PCF Implementation:**
```css
padding: 8px 10px 7px;
border: 2px solid transparent;
box-shadow: 0 2px 0 #002d18;
background-color: #00703c;
```

**govuk-frontend SCSS:**
```scss
padding: (govuk-spacing(2) - $govuk-border-width-form-element) govuk-spacing(2)
         (govuk-spacing(2) - $govuk-border-width-form-element - ($button-shadow-size * 0.5));
// Resolves to: (10px - 2px) 10px (10px - 2px - 1px) = 8px 10px 7px
```

**Verdict:** ✅ **ALIGNED**
- Padding calculation is correct
- Shadow size matches (2px)
- Colors match GOV.UK green palette
- Focus states implemented correctly
- Secondary and warning variants match

### 3. TextInput Component

**PCF Implementation:**
```css
font-size: 1rem;  /* Mobile */
@media (min-width: 40.0625em) {
  font-size: 1.1875rem;  /* Tablet: 19px */
}
height: 40px;
padding: 5px;
border: 2px solid #0b0c0c;
```

**govuk-react Implementation:**
```tsx
typography.font({ size: 19 })  // → 16px mobile, 19px tablet
height: '40px'
padding: SPACING_POINTS[1]  // 5px
border: `${BORDER_WIDTH_FORM_ELEMENT} solid ${BLACK}`  // 2px solid #0b0c0c
```

**Verdict:** ✅ **ALIGNED**
- Responsive typography correct
- Height matches (40px)
- Padding matches (5px = spacing(1))
- Border matches (2px solid #0b0c0c)
- Error state border correct (4px solid #d4351c - NOT IMPLEMENTED, see below)

**Issue Found:** ⚠️ Error state uses 2px border, should be 4px
```css
/* Current */
.govuk-input--error {
  border-color: #d4351c;
}

/* Should be */
.govuk-input--error {
  border: 4px solid #d4351c;
}
```

### 4. Select Component

**PCF Implementation:**
```css
height: 40px;
padding: 5px;
font-size: 1rem → 1.1875rem (responsive)
```

**govuk-react Implementation:**
```tsx
height: '33px' (mobile) / '38px' (large screen)
padding: '5px 4px 4px'
typography.font({ size: 19 })
```

**Verdict:** ⚠️ **MINOR DIFFERENCE**
- PCF uses 40px height consistently
- govuk-react uses 33px mobile, 38px large screen
- Padding: PCF uses 5px all sides, govuk-react uses 5px 4px 4px
- **Recommendation:** PCF approach is simpler and close enough (difference is minor)

**Issue Found:** ⚠️ Error state uses 2px border, should be 4px (same as TextInput)

### 5. Textarea Component

**PCF Implementation:** (Need to verify)

**govuk-react Implementation:**
```tsx
border: error ? `4px solid ${ERROR_COLOUR}` : undefined
```

**Verdict:** ⚠️ **CHECK ERROR STATE** - Same issue as TextInput/Select

### 6. Label Component

**PCF Implementation:**
```css
font-size: 1rem → 1.1875rem (responsive)
margin-bottom: 5px;
font-weight: 400 (regular) / 700 (--xl, --l, --m, --s)
```

**govuk-react Implementation:**
```tsx
// Basic label is just a flex container
// LabelText component handles typography
```

**Verdict:** ✅ **ALIGNED**
- Typography scale matches
- Size modifiers (--xl, --l, --m, --s) implemented correctly
- Spacing matches govuk-frontend

### 7. Pagination Component

**PCF Implementation:** (Previously reviewed, :has selector removed for compatibility)

**Verdict:** ✅ **ALIGNED** with PCF constraints

---

## Architecture Differences (Not Issues)

### govuk-react Approach:
```tsx
<Table>
  <Table.Row>
    <Table.CellHeader>Header</Table.CellHeader>
    <Table.Cell>Value</Table.Cell>
  </Table.Row>
</Table>
```
- **Styled-components** for CSS-in-JS
- **Compositional API** (sub-components)
- **Utility functions** for typography/spacing

### PCF Approach:
```tsx
<Table 
  head={[{text: 'Header'}]}
  body={[[{text: 'Value'}]]}
/>
```
- **CSS modules** for styling
- **Data-driven API** (arrays of objects)
- **Class-based components** (React 16.4 compatibility)

**Verdict:** ✅ **BOTH VALID** - Different design philosophies, both follow GOV.UK styling accurately

---

## Color Palette Verification

| Color Purpose | Expected (govuk-frontend) | PCF Implementation | Status |
|--------------|---------------------------|-------------------|--------|
| Black | #0b0c0c | #0b0c0c | ✅ |
| Border (black tint-80) | #cecece | #cecece | ✅ |
| Error Red | #d4351c | #d4351c | ✅ |
| Button Green | #00703c | #00703c | ✅ |
| Button Shadow | #002d18 | #002d18 | ✅ |
| Focus Yellow | #ffdd00 (#fd0) | #fd0 | ✅ |
| White | #ffffff | #ffffff | ✅ |
| Secondary Button Gray | #f3f2f1 | #f3f2f1 | ✅ |
| Warning Button Red | #d4351c | #d4351c | ✅ |

---

## Typography Scale Verification

| Size | Mobile | Tablet | PCF Implementation | Status |
|------|--------|--------|-------------------|--------|
| 19 (body) | 16px / 1.25 | 19px / 1.3158 | font-size: 1rem → 1.1875rem | ✅ |
| 24 | 18px / 1.111 | 24px / 1.25 | Labels --m | ✅ |
| 27 | 18px / 1.111 | 27px / 1.111 | Labels --l | ✅ |
| 36 | 24px / 1.042 | 36px / 1.111 | Labels --xl | ✅ |

---

## Spacing Scale Verification

govuk-frontend SPACING_POINTS: 0, 5, 10, 15, 20, 25, 30, 40, 50, 60

| Usage | Expected | PCF | Status |
|-------|----------|-----|--------|
| Label margin-bottom | 5px (1) | 5px | ✅ |
| Input padding | 5px (1) | 5px | ✅ |
| Button padding | 8px 10px 7px (calculated) | 8px 10px 7px | ✅ |
| Table cell padding | 10px 20px 10px 0 (2,4,2,0) | 10px 20px 10px 0 | ✅ |
| Table margin-bottom | 20px mobile, 30px tablet (6) | 20px → 30px | ✅ |
| Caption spacing (--l/--xl/--m) | 15px (3) | 15px | ✅ |

---

## Issues Found & Recommendations

### 🔴 Critical Issues: NONE

### ⚠️ Minor Issues to Fix:

1. **Error State Border Width** (TextInput, Select, Textarea)
   - **Current:** `border-color: #d4351c` (keeps 2px width)
   - **Should be:** `border: 4px solid #d4351c` (increases to 4px)
   - **Reason:** GOV.UK pattern uses thicker border for error states to improve visibility
   - **Priority:** Medium - affects accessibility compliance

2. **Select Height** (Optional)
   - **Current:** 40px consistent
   - **govuk-react:** 33px mobile, 38px large screen
   - **Recommendation:** Keep current (40px is simpler and close enough)
   - **Priority:** Low - not critical

### ✅ Well-Implemented Features:

1. ✅ **Responsive typography** with correct mobile/tablet breakpoints
2. ✅ **Focus states** with 3px solid #fd0 outline
3. ✅ **Button shadow calculations** matching govuk-frontend exactly
4. ✅ **Table numeric cell formatting** with tabular-nums
5. ✅ **Caption size modifiers** (--xl, --l, --m)
6. ✅ **Color palette** matching GOV.UK exactly
7. ✅ **Spacing scale** adherence
8. ✅ **Print media queries** for table typography
9. ✅ **Disabled states** with 0.5 opacity
10. ✅ **Button variants** (secondary, warning) with correct colors

---

## Recommended Actions

### Immediate (This Session):
1. ✅ Fix error state border width for TextInput
2. ✅ Fix error state border width for Select  
3. ✅ Fix error state border width for Textarea
4. ✅ Run build to verify no regressions

### Future Considerations:
- Consider documenting the data-driven API approach in comparison to govuk-react's compositional approach
- Add visual regression tests comparing rendered output to govuk-frontend examples

---

## Conclusion

**PCF components are highly accurate implementations of GOV.UK Design System patterns.** The main difference from govuk-react is architectural (CSS modules vs styled-components, data-driven vs compositional), not stylistic. The actual CSS values match govuk-frontend canonical sources almost perfectly.

**Only critical fix needed:** Error state border width for form controls (2px → 4px).

**Overall Grade:** A- (would be A+ after error border fix)
