# Composition

**Version:** 0.2.0
**System:** ds-ai-poc
**Reads with:** `index/components.index.json` (what exists) and `contracts/button.contract.json` (how Button is used)
**Last audited:** October 2026, against Carbon, Apple HIG, Material 3, GOV.UK and other public systems (see "Sources" at the end)

The index says what exists. The contract says how one component behaves. This file says how components are placed and combined on a screen.

This POC has one component, so most of this file answers one question: **which action on a screen gets the Button, and what happens to the others.**

---

## 1. Before placing a Button: the decision checklist

Work through these in order. Stop at the first step that fails.

1. **List every action on the screen.** Include actions the request mentions only in passing, such as "forgot password", "back" or "cancel".
2. **Pick the primary action using the priority rule (section 2).** Exactly one action per view can be primary.
3. **Check the primary action is not destructive.** If it deletes data or cannot be undone, stop. A destructive action must never get the primary Button, even when it is the most likely choice. Report this instead of building.
4. **Give the primary action the Button.** Choose the size explicitly using section 3. Do not rely on the prop default.
5. **Check every remaining action against the index.** None of them can use Button. If the component they need is listed under `notYetDefined`, follow section 6.

---

## 2. Priority rule: which action gets the Button

The Button goes to the action that **moves the user forward in the main task of the view.**

If more than one action seems to qualify, use these tie-breakers in order:

1. The action the view exists for wins. On a login screen, that is logging in, not creating an account.
2. The action most users take wins over the action few users take.
3. The action that completes a step wins over the action that leaves the flow.

Actions that never get the Button, even when they are the only action in the view:

| Action type | Examples | Why | Needs |
|---|---|---|---|
| Navigation | "View all transactions", "Learn more" | Buttons perform actions; moving to another page is a link | Link (not yet defined) |
| Cancel or back | "Cancel", "Back", "Skip" | Leaving or abandoning a step is a lower-priority, negative action | Secondary button or Link (not yet defined) |
| Destructive | "Delete account", "Remove payee" | A prominent button may be pressed without being read | Destructive variant and confirmation pattern (not yet defined) |
| Icon-only | Close (×), share | No label to read | Icon button (not yet defined) |

Note that **cancel is not destructive**. Cancelling abandons a step; destroying deletes something. They need different components.

**What counts as one view:** a screen is one view. A modal or bottom sheet is a separate view with its own single Button, because the screen behind it is not interactive while it is open.

---

## 3. Choosing the size

Every touch target must be at least 44×44 pt on iOS and 48×48 dp on Android. The Button's rendered height is its label line height plus top and bottom padding.

| Size | Rendered height | Touch use | Use for |
|---|---|---|---|
| `Large` | 54 px | Meets iOS and Android minimums | Full-bleed mobile layouts where the Button spans the viewport |
| `Medium` | 44 px | Meets the iOS minimum; below the Android 48 dp minimum | Most screens, including forms and modals |
| `Small` | 34 px | Below both minimums | Pointer contexts only (desktop web), such as cards or inline confirmations |

Rules:

- Always set `size` explicitly. See "Known issues".
- Do not use `Small` on touch screens unless the hit area is extended to the minimum in code.
- On Android, prefer `Large`, or extend the `Medium` hit area to 48 dp.
- **Never use size to signal priority.** A smaller Button does not mean a less important action. There is only one Button per view, and it is always the primary action.

---

## 4. Labels

- Write the label as a verb that says what will happen: "Log in", "Confirm transfer", "Continue".
- Use sentence case.
- Keep it short enough to stay on one line. The label never wraps.
- The label must match the result. If the Button says "Confirm transfer", pressing it confirms the transfer, not opens another screen to review it.

---

## 5. Screen patterns

Each pattern lists the content from top to bottom. The Button is always the last interactive element in its container, full width, and the only Button in the view.

### 5.1 Login screen

1. Title
2. Input fields (for example, username and password)
3. **Button**, `Large` on full-bleed mobile, otherwise `Medium`. Label: "Log in".

"Forgot password" and "Create account" need the Link component, which is not yet defined. See section 6.

### 5.2 Form or modal submit

1. Title
2. Form content
3. **Button**, `Medium` (or `Large` on Android). Label: the submit action, for example "Continue".

**Keep the Button enabled while the form is incomplete.** When the user presses it, validate the form and show error messages explaining what to fix. A disabled Button gives no reason why it cannot be pressed, and its low contrast makes it hard to see.

Use `state=Disabled` only while the action is being processed, to stop a second submission. When you do, make the Button non-interactive in code as well. See "Known issues" for the missing loading state.

### 5.3 Confirmation step in a flow

1. Summary of what the user is about to confirm (for example, amount and recipient for a transfer)
2. **Button**, `Large` on full-bleed mobile, otherwise `Medium`. Label: the confirming action, for example "Confirm transfer".

If confirming cannot be undone, the full summary must appear in the same view, before the Button. If the action destroys data, stop and report (checklist step 3).

### 5.4 Onboarding step

1. Step content (illustration, heading, short text)
2. **Button**, `Large` on full-bleed mobile. Label: the forward action, for example "Next" or "Get started".

"Skip" and "Back" need a secondary button or Link, which are not yet defined.

### 5.5 Card or inline confirmation

1. Card content
2. **Button**, `Small` on desktop web only; `Medium` or larger on touch screens. Label: the card's single action.

If the view already has a primary Button elsewhere, the card cannot have one. Report the conflict.

---

## 6. When the view needs a component that does not exist

This system is intentionally incomplete. When a request needs a component listed under `notYetDefined` in the index:

**Do:**
- Build the parts that are defined.
- Leave a clearly marked placeholder where the missing component would go.
- Report which component is missing and which action needed it.

**Do not:**
- Use a second Button for a secondary action.
- Restyle the Button to look secondary, for example by changing its colour or removing its background.
- Use a smaller Button to make an action look less important.
- Use the Button with an empty label as an icon button.
- Invent a new component that is not in the index.

Reporting a gap is the correct result. It tells the design system team what to build next.

---

## 7. Anti-patterns

| Do not | Why | Instead |
|---|---|---|
| Two Buttons side by side, such as "Cancel" and "Confirm" | Only one Button per view, and no secondary variant exists | Give "Confirm" the Button; report that "Cancel" needs a secondary component |
| A Button for "Delete account" | Destructive actions must not use the primary style | Stop and report |
| A Button for "View all transactions" | Navigation is not an action | Report that a Link component is needed |
| A disabled Button on an incomplete form | Users cannot tell why it does not work | Keep it enabled and show validation errors on press |
| A `Small` Button on a mobile screen | Below the minimum touch target | Use `Medium` or `Large` |
| `state=Hover` or `state=Active` in a static screen | These states belong to the interaction layer | Use `state=Default` |
| A Button placed above the form it submits | The Button completes the step, so it comes last | Place it after the form content |

---

## Known issues

These need decisions from the design system team. Until then, follow the workaround.

- **Default size conflict.** The contract sets the `size` default to `Small`, but its usage guidance says `Medium` is the default for most screens. Workaround: always set `size` explicitly.
- **`Small` is below the touch target minimum.** At 34 px it cannot be used on touch screens as defined. Workaround: desktop web only.
- **Cancel is listed as destructive in the contract.** The contract's "when not to use" groups cancel with delete. This file treats them separately. The contract should be updated to match.
- **No loading state.** A Button that is processing should show progress. The system has no loading state, so `Disabled` is used during processing as a stopgap.
- **No layout spacing tokens.** The system defines spacing inside the Button but not between the Button and other content. Workaround: use the spacing of the containing layout frame and do not invent token names.

---

## Sources

The rules in this file follow common practice across public design systems, checked in October 2026:

- **One primary button per view; modals count as their own view:** Carbon, Apple HIG, eBay Playbook
- **Destructive actions never get the primary role:** Apple HIG
- **Cancel and destructive are separate roles:** Apple HIG, Carbon
- **Avoid disabled buttons; use validation instead:** GOV.UK Design System and systems based on it
- **Touch targets of 44×44 pt (iOS) and 48×48 dp (Android):** Apple HIG, Material
- **Do not use size to signal priority:** Apple HIG
- **Buttons for actions, links for navigation:** Carbon, GOV.UK, Material
- **Sentence case labels:** Carbon
