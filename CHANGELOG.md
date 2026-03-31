# Changelog

## [0.2.0] — 2026-03-31

### Changed
- **Typography tokens use composites.** Semantic layer groups fontFamily, fontSize, fontWeight, and lineHeight into a single object per text style. Component layer references the composite as one token. In Figma, component-layer typography is applied via Text Styles (one style per text role), not individual variables.
- **Leading primitives use absolute px values** (`leading/sm: 18`, `leading/md: 20`, `leading/lg: 22`) instead of ratios. Matches Figma's line-height model.
- **Removed unused tokens** `button/radius/sm` and `button/radius/md` — all Button sizes use `button/radius/full` (pill).
- **Version aligned** across manifest.json, components.index.json, and button.contract.json (all 0.2.0).

### Added
- `validate.js` — token reference validation script. Checks all alias chains (semantic → primitives, component → semantic) and detects skip-layer violations.
- `CHANGELOG.md` — this file.
- Typography section in CLAUDE.md explaining how composites work across code and Figma.
- Dark mode values for all semantic color tokens in semantic.json.

## [0.1.0] — 2026-03-27

### Added
- Initial POC: Button component with 12 variants (3 sizes × 4 states).
- Three-tier token architecture: primitives.json, semantic.json, component.json.
- Intelligence layer: manifest.json, components.index.json, button.contract.json, button.md.
- CLAUDE.md navigation guide.
- button.html working demo with full 3-tier CSS.
- Figma file with variable collections mirroring the JSON token structure.
