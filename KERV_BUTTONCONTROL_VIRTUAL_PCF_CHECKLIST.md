# Kerv ButtonControl Virtual PCF Checklist

This checklist is pre-filled with your confirmed values:
- Environment URL: https://aj-kerv.crm11.dynamics.com/
- Publisher display name: Kerv
- Publisher prefix: kerv
- Solution unique name: KervGdsVirtualControls
- Solution display name: Kerv GDS Virtual Controls

## Recommended defaults used in this checklist
- Namespace: Kerv.GDS
- Control name: ButtonControl
- Initial solution version: 1.0.0.0
- Deployment flow: both (quick push and solution packaging)

## 1) Open terminal at workspace root

cd C:\Users\AJZafar\Desktop\GDS-PCF

## 2) Create the control in the new virtual controls folder

cd gds-pcf-work\pcf-virtual-react-controls
pac pcf init --namespace Kerv.GDS --name ButtonControl --template field --framework react
cd ButtonControl
npm install

## 3) Edit control files to map Button React props

Update these files:
- src\ControlManifest.Input.xml
- src\strings\ButtonControl.1033.resx
- src\index.ts

Suggested first properties for Power Apps:
- text (SingleLine.Text, required)
- href (SingleLine.Text, optional)
- disabled (TwoOptions, optional)
- isStartButton (TwoOptions, optional)
- preventDoubleClick (TwoOptions, optional)
- name (SingleLine.Text, optional)
- value (SingleLine.Text, optional)
- className (SingleLine.Text, optional)

## 4) Regenerate manifest types and build

npm run refreshTypes
npm run build

## 5) Authenticate PAC to your environment

pac auth create --url "https://aj-kerv.crm11.dynamics.com/"
pac auth list

If multiple profiles exist, select the right one:

pac auth select --index 1

## 6) Quick test deployment (fastest)

From ButtonControl folder:

pac pcf push --publisher-prefix kerv

## 7) Create solution and add control reference (recommended path)

From gds-pcf-work\pcf-virtual-react-controls:

mkdir Solutions
cd Solutions
pac solution init --publisher-name "Kerv" --publisher-prefix kerv --outputDirectory . --solutionName "Kerv GDS Virtual Controls" --solutionVersion 1.0.0.0

Set unique name if prompted or not auto-set to desired value:
- KervGdsVirtualControls

Add ButtonControl reference:

pac solution add-reference --path "..\ButtonControl"

## 8) Build and import solution

msbuild *.cdsproj /restore /t:build /p:configuration=Debug

Import generated zip (adjust exact filename if needed):

pac solution import --path ".\bin\Debug\KervGdsVirtualControls.zip"

## 9) Validate in Power Apps

- Open target app in https://aj-kerv.crm11.dynamics.com/
- Add ButtonControl custom control
- Verify labels/descriptions from resx
- Verify Button props work as expected

## 10) Repeat for next control

Use same pattern in gds-pcf-work\pcf-virtual-react-controls for each control.

---

## One-shot command block

cd C:\Users\AJZafar\Desktop\GDS-PCF\gds-pcf-work\pcf-virtual-react-controls
pac pcf init --namespace Kerv.GDS --name ButtonControl --template field --framework react
cd ButtonControl
npm install
npm run refreshTypes
npm run build
pac auth create --url "https://aj-kerv.crm11.dynamics.com/"
pac auth list
pac auth select --index 1
pac pcf push --publisher-prefix kerv

## If solution import fails to find exact zip

Run this to list built zips:

dir .\bin\Debug\*.zip
