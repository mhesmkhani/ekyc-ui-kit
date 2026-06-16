# EKYC Design System Storybook

Standalone Storybook project for the EKYC UI components.

## Run

```bash
npm install
npm run storybook
```

Storybook starts on port `6006` and binds to `0.0.0.0`, so you can open it from localhost or your LAN IP.

## Included fixes

- Refactored `Text` component props to be Storybook/docgen-friendly.
- Refactored `Tooltip` component props into a separate exported `tooltip.props.ts` file.
- Updated `Text` and `Tooltip` stories so Storybook controls do not try to serialize JSX children.
- Added a visual `Design System / Colors / Palette` story.
- Added `staticDirs: ['../public']` so Storybook can serve logo and static files.
- Updated the Storybook dev script to avoid host-related `fetchIndex` issues.

## Fonts

The CSS is already configured for IRANSans from:

```txt
public/fonts/IRANSansWeb/woff2/
```

Copy your licensed font files into that folder with these names:

```txt
IRANSansWeb(FaNum).woff2
IRANSansWeb(FaNum)_Medium.woff2
IRANSansWeb(FaNum)_Bold.woff2
```

Font files are intentionally not included in this zip. Storybook will still run with system fallback fonts if they are missing.
