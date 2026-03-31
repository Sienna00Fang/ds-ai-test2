# Button

**Category:** Action
**Version:** 0.2.0
**Figma node:** `2045:85` (branch `79NGoL3Kwr4i4jvcUF6yWP`) — [Open in Figma](https://www.figma.com/design/J6PCrb0xiyDTPxnB5hTfP3/branch/79NGoL3Kwr4i4jvcUF6yWP/AI-ready-DS---POC?node-id=2045-85)
**Contract:** `contracts/button.contract.json`

---

## What it is

Full-width primary CTA button for banking interfaces. This is the single highest-priority action component in the system. It is designed for one action per screen — the most important one.

Default width is 300px, matching a standard mobile canvas. When placed inside a layout frame, it fills the container width.

---

## Props

| Prop    | Type   | Values                              | Default   |
|---------|--------|-------------------------------------|-----------|
| `size`  | enum   | `Small` \| `Medium` \| `Large`      | `Small`   |
| `state` | enum   | `Default` \| `Hover` \| `Active` \| `Disabled` | `Default` |

**`size`** controls padding and typography scale. It does not affect color. All sizes use full pill radius.
**`state`** controls background, border, and label color. It does not affect size or typography.

These two axes are fully independent. Every combination is defined in Figma (12 variants total).

---

## Sizes

| Size   | Font size | Line height | Padding X | Padding Y | Radius        |
|--------|-----------|-------------|-----------|-----------|---------------|
| Small  | 14px      | 18px        | 12px      | 8px       | 9999px (pill) |
| Medium | 16px      | 20px        | 16px      | 12px      | 9999px (pill) |
| Large  | 18px      | 22px        | 24px      | 16px      | 9999px (pill) |

Gap between elements is 8px on all sizes.
Font is always Inter, weight 600 (Semi Bold).

**When to use each size:**
- **Large** — full-bleed mobile layouts where the button fills the viewport width
- **Medium** — default for most screens
- **Small** — compact contexts such as cards or inline confirmations

---

## States

| State    | Background              | Border                       | Label                           |
|----------|-------------------------|------------------------------|---------------------------------|
| Default  | `#2563eb` (blue-600)    | `#2563eb` (blue-600)         | `#ffffff` (neutral-0)           |
| Hover    | `#1d4ed8` (blue-700)    | `#2563eb` (blue-600)         | `#ffffff` (neutral-0)           |
| Active   | `#1e40af` (blue-800)    | `#2563eb` (blue-600)         | `#ffffff` (neutral-0)           |
| Disabled | `#bfdbfe` (blue-200)    | `#bfdbfe` (blue-200)         | `#94a3b8` (neutral-400)         |

Note: Border color stays at blue-600 on Hover and Active — only the background changes. `Hover` and `Active` are interaction states. Do not set them statically in an implementation — they are managed by the UI interaction layer.

---

## Token map

All visual properties are controlled by component-level tokens. Never hardcode values.

### Color tokens (state-scoped)

| Property   | Default state                      | Hover state                           | Active state                           | Disabled state                              |
|------------|------------------------------------|---------------------------------------|----------------------------------------|---------------------------------------------|
| Background | `button/color/background`          | `button/color/background-hover`       | `button/color/background-active`       | `button/color/background-disabled`          |
| Border     | `button/color/border`              | `button/color/border`                 | `button/color/border`                  | `button/color/border-disabled`              |
| Label      | `button/color/label`               | `button/color/label`                  | `button/color/label`                   | `button/color/label-disabled`               |

### Spacing tokens (size-scoped)

| Property   | Small                           | Medium                          | Large                           |
|------------|---------------------------------|---------------------------------|---------------------------------|
| Padding X  | `button/spacing/padding-x-sm`   | `button/spacing/padding-x-md`   | `button/spacing/padding-x-lg`   |
| Padding Y  | `button/spacing/padding-y-sm`   | `button/spacing/padding-y-md`   | `button/spacing/padding-y-lg`   |
| Gap        | `button/spacing/gap`            | `button/spacing/gap`            | `button/spacing/gap`            |
| Radius     | `button/radius/full`            | `button/radius/full`            | `button/radius/full`            |

### Typography (Text Styles)

Typography is applied via Figma Text Styles, not individual component-layer variables. Each Text Style binds to semantic variables which alias to primitives.

| Size   | Text Style         | Font           | Size | Weight | Line height |
|--------|--------------------|----------------|------|--------|-------------|
| Small  | `Button/Label-sm`  | Inter          | 14px | 600    | 18px        |
| Medium | `Button/Label-md`  | Inter          | 16px | 600    | 20px        |
| Large  | `Button/Label-lg`  | Inter          | 18px | 600    | 22px        |

Text Style binding chain:
```
Text Style: Button/Label-sm
  → fontFamily bound to semantic: typography/label-sm/family  → primitives: typography/family/base = "Inter"
  → fontSize  bound to semantic: typography/label-sm/size    → primitives: typography/size/sm = 14
  → fontWeight bound to semantic: typography/label-sm/weight  → primitives: typography/weight/semibold = 600
  → lineHeight bound to semantic: typography/label-sm/leading → primitives: typography/leading/sm = 18
```

### Token alias chain examples

Component tokens resolve through two layers before reaching a raw value:

```
button/color/background
  → semantic: color/action/primary
    → primitive: color/blue/600
      → #2563eb

button/spacing/padding-x-lg
  → semantic: spacing/component-lg
    → primitive: spacing/6
      → 24

button/radius/full
  → semantic: radius/component-full
    → primitive: radius/full
      → 9999
```

Do not skip layers. Component tokens must alias semantic tokens. Semantic tokens must alias primitives.

---

## When to use

- The single most important action on a screen
- Login screens, confirmation flows, and onboarding steps
- High-stakes or irreversible actions that must stand out
- The primary submit action at the bottom of a form or modal

## When not to use

- **Secondary or tertiary actions** — no secondary button variant exists in this system yet
- **More than one per screen** — do not place two Button components on the same view
- **Navigation** — use a link or nav element instead
- **Destructive actions** (delete, cancel) — requires a confirmation pattern not yet defined in this system
- **Static Hover or Active state** — these are managed by the interaction layer, not set manually
- **Disabled without enforcement** — do not set `state=Disabled` without also disabling the interaction in code

---

## Constraints

- **Width:** Full-width (fill container). Do not set a fixed width other than the 300px default unless inside a layout frame.
- **Label:** Always center-aligned, always single-line. Do not wrap the label text.
- **Color:** All values must resolve through the token chain. Never hardcode hex values.
- **Typography:** Always Inter SemiBold (weight 600). Do not override font family or weight.
- **Border:** Stays constant (blue-600) on hover and active — only background changes.
- **Variants:** Two axes only — `size` and `state`. No other visual properties are exposed or customisable.
- **Token chain:** Component tokens alias semantic tokens. Semantic tokens alias primitives. This chain must remain unbroken.

---

## Alternatives

| Situation | What to do |
|-----------|-----------|
| Secondary or ghost action needed alongside this button | No secondary button exists yet. Add a new component to the index before implementing. |
| Inline or text-only action | No link or text-action component exists yet. Do not repurpose Button for this. |
| Icon-only action | No icon button exists yet. Do not use Button with an empty label. |
