# CLAUDE.md

## What this repo is
This repo contains the intelligence layer for a design system POC.
It has no component code. All component definitions live in Figma.
This repo exists to make those definitions legible to AI agents.

The design system is a banking CTA button built from scratch with a
three-layer token architecture: primitives, semantic, and component.
All tokens are defined as Figma Variables or Styles in a Figma file. For more specific use case, refer to the Figma file.

## MVP Architecture — Three Pillars

### 1. Codebase Index
The reference dictionary for knowing which components exist, where
they are, and how they are organized.

| File                            | Purpose                                | Status     |
|---------------------------------|----------------------------------------|------------|
| `index/components.index.json`  | Complete catalog of components with metadata | **exists** |
| `index/components.index.md`    | Human-readable component index         | **exists** |
| `index/components-tree.json`   | Hierarchical structure and organization | planned    |
| `index/relationship.toml`      | Which components contain others        | planned    |
| `index/versions.json`          | Component version control              | planned    |

### 2. IA-Metadata
Detailed specifications of how each component works and composition
patterns.

| File                            | Purpose                                | Status     |
|---------------------------------|----------------------------------------|------------|
| `contracts/button.contract.json`| Button props, tokens, constraints      | **exists** |
| `contracts/patterns.json`      | Composition patterns                   | planned    |
| `contracts/constraints.json`   | Rules for what can contain what (validation) | planned |

### 3. DS-Composer
Rules and templates for generating screens with components
automatically.

| File                            | Purpose                                | Status     |
|---------------------------------|----------------------------------------|------------|
| `composer/composition-schema.json` | Composition validation schema       | planned    |
| `composer/composer-rules.json`     | General composition rules           | planned    |
| `composer/templates_index.json`    | Predefined templates                | planned    |

> **Note:** Files marked "planned" do not exist yet. Do not attempt to
> read or reference them. Only work with files that exist.

## How to navigate this repo
1. Read manifest.json first to understand what this system contains
2. Read index/ files to find what components exist and how they
   relate to each other
3. Read the relevant contract in contracts/ for the component you
   are working with
4. Read tokens/ files to resolve token values
5. If composing screens, read composer/ for rules and templates
6. Never invent structure that is not in the index

## What you are allowed to do
- Read from Figma via the official Figma MCP
- Write contract JSON files to contracts/
- Write Markdown documentation to docs/
- Write token data to tokens/
- Write component entries to index/
- Write composition rules to composer/

## What you are NOT allowed to do
- Invent component props that are not in the Figma file
- Hardcode hex values — always resolve to token names
- Create files or folders not defined in this architecture
- Assume a component exists if it is not in the index
- Skip the index — always check what exists before creating
- Reference tokens from the wrong tier (component must alias
  semantic, semantic must alias primitives — never skip a layer)
- Create CSS/code with values that bypass the token chain

## Token architecture
Three layers, all defined as Figma Variables:
- `tokens/primitives.json` — raw values, named by scale position
- `tokens/semantic.json` — aliases to primitives, named by role
- `tokens/component.json` — aliases to semantic tokens, named by
  component property and state

Alias chains must remain unbroken:
```
primitives  →  semantic  →  component
(raw value)    (by role)    (by component prop/state)
```
Never alias primitives directly from component tokens.

### Typography: Figma and code look different but are the same thing

Typography is packaged differently on each side:
- **In code**, multiple properties (family, size, weight,
  lineHeight) are grouped into one composite object per style.
- **In Figma**, those same properties are individual variables at
  the semantic layer, and packaged into one Text Style at the
  component layer.

Both sides go from individual properties to a single package — code
does it with JSON composites, Figma does it with Text Styles.

If you count variables in Figma and keys in JSON, the numbers will
not match for typography. That is because Figma Text Styles are not
variables — they do not show up in the variable count, but they
exist and carry the same information. Code has no Text Styles, so
it uses JSON keys instead. Both sides have the same data, just
counted differently.

Do not "fix" this by splitting composites in code or by replacing
Text Styles with individual variable bindings in Figma.

## Components in this system
Currently one component: Button
- Figma component name: Button
- Contract: contracts/button.contract.json
- Documentation: docs/button.md
- Variants: Size (Small, Medium, Large), State (Default, Hover,
  Active, Disabled)
- All properties bound to component-level Figma Variables
- Typography applied via Text Styles (Button/Label-sm, md, lg)

## Figma source of truth
- File: AI-ready DS — POC
- Branch: Test: Typography tokens
- Branch key: 79NGoL3Kwr4i4jvcUF6yWP
- Component page node: 1:17
- Access: via Figma MCP (`mcp__claude_ai_Figma__use_figma`)
- Always verify against Figma before assuming token values are current
