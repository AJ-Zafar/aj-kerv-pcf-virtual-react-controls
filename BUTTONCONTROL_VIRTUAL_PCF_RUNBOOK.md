# ButtonControl Virtual PCF Runbook (Kerv Publisher)

This guide walks you through creating and testing one virtual React PCF control (ButtonControl) from scratch in the new folder structure.

## 0) Prerequisites (one-time)

Run these in VS Code terminal and confirm they return versions:

```powershell
node -v
npm -v
pac --version
msbuild -version
```

If `pac` is missing:

```powershell
npm install -g pac
```

## 1) Go to the new controls root

```powershell
cd "C:\Users\AJZafar\Desktop\GDS-PCF\gds-pcf-work\pcf-virtual-react-controls"
```

## 2) Create ButtonControl using React template

```powershell
pac pcf init --namespace Kerv.GDS --name ButtonControl --template field --framework react
cd ButtonControl
npm install
```

Notes:
- `--framework react` scaffolds ReactControl pattern (virtual control style).
- Folder created: `gds-pcf-work/pcf-virtual-react-controls/ButtonControl`.

## 3) Add/align control properties from the GOV React Button props

Source React component:
- `gds-pcf-work/pcf-gov-components/src/components/Button`

Update these files in your new control:
- `gds-pcf-work/pcf-virtual-react-controls/ButtonControl/src/ControlManifest.Input.xml`
- `gds-pcf-work/pcf-virtual-react-controls/ButtonControl/src/strings/ButtonControl.1033.resx`
- `gds-pcf-work/pcf-virtual-react-controls/ButtonControl/src/index.ts`

Recommended mapping (minimum useful set):
- `text` (SingleLine.Text, required)
- `href` (SingleLine.Text, optional)
- `disabled` (TwoOptions, optional)
- `isStartButton` (TwoOptions, optional)
- `preventDoubleClick` (TwoOptions, optional)
- `name` (SingleLine.Text, optional)
- `value` (SingleLine.Text, optional)
- `className` (SingleLine.Text, optional)

## 4) Refresh generated typings after manifest edits

```powershell
npm run refreshTypes
```

This updates `generated/ManifestTypes.d.ts` from your manifest.

## 5) Build locally (dev build)

```powershell
npm run build
```

Optional watch mode while editing:

```powershell
npm run start
```

## 6) Authenticate to your Dataverse environment

```powershell
pac auth create --url "https://YOUR_ENVIRONMENT.crm.dynamics.com"
pac auth list
pac auth select --index 1
```

Use your actual environment URL and select the correct profile index.

## 7) Push control directly for quick test (uses Kerv publisher)

From the ButtonControl folder:

```powershell
pac pcf push --publisher-prefix kerv
```

This is the fastest way to test in environment without full solution packaging.

## 8) (Recommended) Put it in a solution with Kerv publisher

From `gds-pcf-work/pcf-virtual-react-controls`:

```powershell
mkdir Solutions
cd Solutions
pac solution init --publisher-name "Kerv" --publisher-prefix kerv
pac solution add-reference --path "..\ButtonControl"
```

Build solution package:

```powershell
msbuild *.cdsproj /restore /t:build /p:configuration=Debug
```

Import solution (if you want explicit import step instead of pcf push):

```powershell
pac solution import --path ".\bin\Debug\*.zip"
```

## 9) Validate in Power Apps

1. Open your target app.
2. Add the new custom control (ButtonControl).
3. Confirm properties appear with friendly labels/descriptions from `.resx`.
4. Test behavior for disabled/start/preventDoubleClick/href cases.

## 10) Repeat for other controls

Use the same sequence for each component in:
- `gds-pcf-work/pcf-gov-components/src/components`

Keep all new controls under:
- `gds-pcf-work/pcf-virtual-react-controls`

---

## Quick command block (copy/paste)

```powershell
cd "C:\Users\AJZafar\Desktop\GDS-PCF\gds-pcf-work\pcf-virtual-react-controls"
pac pcf init --namespace Kerv.GDS --name ButtonControl --template field --framework react
cd ButtonControl
npm install
npm run refreshTypes
npm run build
pac auth create --url "https://YOUR_ENVIRONMENT.crm.dynamics.com"
pac auth list
pac auth select --index 1
pac pcf push --publisher-prefix kerv
```
