# PCF Control AI Conversion Workflow

This file lists every PCF virtual React control to process and the exact AI prompts to use for each, in order. For each control, follow the prompts step by step, pasting the results into the appropriate files and running the build/reference steps as needed. All controls should be placed in:

		gds-pcf-work/pcf-virtual-react-controls/<ControlName>

Each control folder should contain:
	- src/ (TypeScript/React code)
	- strings/ (for .resx files)
	- ControlManifest.Input.xml

---

## Controls to Process

- AccordionControl
- BackLinkControl
- BreadcrumbsControl
- ButtonControl
- CharacterCountControl
- CheckboxGroupControl
- DateInputControl
- DetailsControl
- ErrorSummaryControl
- FileUploadControl
- FilterPaneControl
- InsetTextControl
- NotificationBannerControl
- PaginationControl
- PanelControl
- PhaseBannerControl
- RadioGroupControl
- SectionBreakControl
- SectionControl
- SelectControl
- SummaryListControl
- TableControl
- TabsControl
- TagControl
- TaskListControl
- TextareaControl
- TextInputControl
- WarningTextControl

---

## AI Workflow Prompts (for each control)

### 1. Extract Props
```
Given the React component file at gds-pcf-work/pcf-gov-components/src/components/<ComponentName>/index.tsx, extract all prop types/interfaces, their names, types, and descriptions. Output as a structured list.
```

### 2. Generate Manifest and .resx
```
Using the following prop list:
[Paste the structured list from previous step]
generate <property> entries for pcf-virtual-react-controls/<ComponentName>/ControlManifest.Input.xml and a .resx file in pcf-virtual-react-controls/<ComponentName>/strings/ with display-name-key and description-key for each property. Use friendly, descriptive names and help text.
```

### 3. Create PCF Wrapper
```
Create a new PCF control in gds-pcf-work/pcf-virtual-react-controls/<ComponentName>/src/index.ts that wraps the React component. The wrapper should use the ReactControl pattern, mapping context.parameters.<property>.raw to the React component props. Ensure all logic, state, and styling are preserved. Output the updated code.
```

### 4. Audit
```
After building and referencing, check that all properties for <ComponentName> appear in Power Apps with correct names and descriptions. Verify the control renders and behaves as expected. List any missing props, broken logic, or styling issues.
```

---

## Instructions
- For each control, replace <ComponentName> with the actual control name.
- Run each prompt in order, pasting the results into the appropriate files in the new folder structure.
- Use the PowerShell script for file operations, build, and reference steps.
- Repeat for all controls listed above.
