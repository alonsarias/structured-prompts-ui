---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/components/ComponentTree.tsx","src/components/SpuigPreview.tsx","src/components/ComponentSelector.tsx","src/components/PropertyEditor.tsx","src/components/CodeHighlighter.tsx","src/theme/index.ts"]
---

# Builder surface (src/App.tsx)

Scope: the single-page SPUIG builder (header, Component Tree, Prompt Preview, Add Component popover, property drawer). Mode: Operate.

Audience and task: developers and designers building a component tree and copying the structured prompt. The loop is add, nest, edit props, copy or download. Undo, redo, and clear are part of it.

Constraints: copy stays exactly as it is. The current design is not an anti-reference; the same regions and reading order are restyled into the pinned world.

## Direction contract

THESIS: The builder is a graphite working surface. Tree and prompt tile the viewport on one 1px seam, and color appears only as syntax state. The category default this refuses is a floating-card dashboard.

OWN-WORLD: Ground #0D1117, panel #151A22, elevated #1B212B, seam #262C36, muted #8B949E, text #E6EDF3. Syntax only: keyword #79C0FF (primary, focus, selection), string #56D364, number #C678DD, warning #E3B341, destructive #F85149. Lexend Compact, small-caps panel headers, tabular figures; Fira Code for the prompt and component names. Square panels, 4px controls. Materials: 1px grid, 1px code ruler, steel-fine ground. Destructive actions are dashed outlines, isolated by empty space.

STORY: The tree and the prompt read as the same syntax. The user adds, nests, and edits, then copies. Delete and Clear all stay quiet outlines until hovered or focused.

FIRST VIEWPORT: A 48px ground header: logo left; Undo, Redo, a gap, Clear all, a gap, GitHub. Below, a full-bleed 1:2 split, Component Tree and Prompt Preview, one seam, 40px small-caps headers on one line. "Add first component" is the only keyword fill. Copy is the keyword panel action. Mobile stacks tree, then preview.

FORM: id: digital-design-canon-dark-first-developer-console, pinned by the user; no concept roll, so no list position and no seed key. Signature motion: a panel expands on one axis (tree branches and Add Component on y; the property drawer on x).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
