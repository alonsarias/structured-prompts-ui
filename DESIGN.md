---
name: SPUIG
description: Graphite developer console where the component tree and the structured prompt share one syntax.
colors:
  ground: "#0D1117"
  panel: "#151A22"
  elevated: "#1B212B"
  seam: "#262C36"
  muted: "#8B949E"
  text: "#E6EDF3"
  keyword: "#79C0FF"
  keyword-light: "#9DCEFF"
  string: "#56D364"
  number: "#C678DD"
  warning: "#E3B341"
  destructive: "#F85149"
typography:
  headline:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.334
    letterSpacing: "normal"
    fontFeature: '"tnum"'
  title:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 560
    lineHeight: 1.6
    letterSpacing: "normal"
    fontFeature: '"tnum"'
  body:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontFeature: '"tnum"'
  body-compact:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "normal"
    fontFeature: '"tnum"'
  label:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.14em"
    fontFeature: '"tnum"'
  button:
    fontFamily: '"Lexend Variable", "Lexend", sans-serif'
    fontSize: "0.8125rem"
    fontWeight: 560
    lineHeight: 1.75
    letterSpacing: "0.01em"
    fontFeature: '"tnum"'
  code:
    fontFamily: '"Fira Code Variable", "Fira Code", ui-monospace, monospace'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontFeature: '"tnum"'
  code-name:
    fontFamily: '"Fira Code Variable", "Fira Code", ui-monospace, monospace'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0"
    fontFeature: '"tnum"'
rounded:
  none: "0px"
  control: "4px"
spacing:
  "2": "2px"
  "4": "4px"
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "24": "24px"
  "32": "32px"
components:
  button-keyword:
    backgroundColor: "{colors.keyword}"
    textColor: "{colors.ground}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "6px 16px"
  button-keyword-hover:
    backgroundColor: "{colors.keyword-light}"
    textColor: "{colors.ground}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "6px 16px"
  button-keyword-disabled:
    backgroundColor: "rgba(121, 192, 255, 0.18)"
    textColor: "rgba(13, 17, 23, 0.55)"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "6px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "6px 16px"
  button-outline-hover:
    backgroundColor: "rgba(121, 192, 255, 0.08)"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "6px 16px"
  button-destructive:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "5px"
  button-destructive-hover:
    backgroundColor: "transparent"
    textColor: "{colors.destructive}"
    rounded: "{rounded.control}"
    padding: "5px"
  copy-control:
    backgroundColor: "{colors.keyword}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "5px"
  copy-control-hover:
    backgroundColor: "{colors.keyword-light}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "5px"
  copy-control-disabled:
    backgroundColor: "rgba(121, 192, 255, 0.18)"
    textColor: "rgba(13, 17, 23, 0.45)"
    rounded: "{rounded.control}"
    padding: "5px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "5px"
  icon-button-hover:
    backgroundColor: "rgba(121, 192, 255, 0.08)"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "5px"
  field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.control}"
    padding: "8.5px 14px"
  field-focus:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.control}"
    padding: "8.5px 14px"
  chip-outline:
    backgroundColor: "transparent"
    textColor: "{colors.number}"
    typography: "{typography.code}"
    rounded: "{rounded.control}"
    height: "16px"
    padding: "0 6px"
  chip-filled:
    backgroundColor: "rgba(121, 192, 255, 0.16)"
    textColor: "{colors.keyword}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.control}"
    padding: "0 8px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
  panel-header:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "40px"
    padding: "0 12px 0 16px"
  popover:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    width: "400px"
  tree-row:
    backgroundColor: "transparent"
    textColor: "{colors.keyword}"
    typography: "{typography.code-name}"
    rounded: "{rounded.control}"
    padding: "4px 8px"
  tree-row-selected:
    backgroundColor: "rgba(121, 192, 255, 0.14)"
    textColor: "{colors.keyword}"
    typography: "{typography.code-name}"
    rounded: "{rounded.control}"
    padding: "4px 8px"
  tooltip:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "4px 8px"
  console-header:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0 12px 0 16px"
---

# Design System: SPUIG

## Overview

**Creative North Star: "The Graphite Seam"**

SPUIG’s working surface is a graphite developer console. The component tree and the prompt preview sit on one panel plane and meet at a single 1px seam. Chrome stays in Lexend; component names and the prompt stay in Fira Code, so the tree and the prompt read as the same syntax.

Color is syntax state. Keyword blue is the only fill, used for the empty-state “Add first component” control and the Copy control. String green, number violet, warning gold, and destructive red appear in code and validation. Graphite does the rest: ground, panel, and elevated, separated by the seam. Panels are square. Controls are 4px. There is no drop shadow.

Destructive actions are a dashed outline in the seam color, held apart by empty space, and turn red only on hover or focus. Below 1200px the stage stacks the tree, then the preview. At 1200px and wider the tree and preview share the width one to two.

**Key Characteristics:**

- Graphite ground, panel, and elevated surfaces
- One 1px seam between tree and prompt
- Color only as syntax state; keyword is the only fill
- Lexend for chrome, Fira Code for names and the prompt
- Small-caps panel headers and tabular figures
- 4px controls, square panels, no shadows
- Dashed destructive controls that turn red only on hover or focus

## Colors

The palette is graphite plus syntax. Keyword is the only color that fills a control. Every other chromatic color names a state in the tree or the prompt.

### Primary

- **Syntax Keyword** (#79C0FF): Component names in the tree, prompt keywords, tags, and functions, the focus ring, the selected tree-row border, and the two keyword fills (empty-state “Add first component”, and Copy).
- **Keyword Lift** (#9DCEFF): Hover of those keyword fills.

### Neutral

- **Graphite Ground** (#0D1117): Page, header, and field interiors.
- **Graphite Panel** (#151A22): Tree and prompt panels, and panel headers.
- **Raised Graphite** (#1B212B): Popovers, menus, the property drawer, tooltips, and alerts.
- **Seam** (#262C36): The 1px line between panels, header and panel rules, input borders, and the prompt ruler.
- **Ash** (#8B949E): Secondary text, panel titles, line numbers, comments, and icon buttons at rest.
- **Paper** (#E6EDF3): Primary text and prompt operators.

### Named Rules

**The Syntax-Only Rule.** Keyword is the only fill. String (#56D364) colors prompt strings and tree text content. Number (#C678DD) colors prompt numbers, booleans, and the property-count chip. Warning (#E3B341) and destructive (#F85149) color validation. None of them paint a surface.

## Typography

**Display Font:** Lexend Variable (with Lexend, then sans-serif)
**Body Font:** Lexend Variable (with Lexend, then sans-serif)
**Label/Mono Font:** Fira Code Variable (with Fira Code, then ui-monospace, monospace)

**Character:** Lexend carries the chrome at a compact working size. Fira Code carries component names and the prompt, so the tree and the prompt are one syntax. Figures are tabular. Panel titles are small-caps.

### Hierarchy

- **Headline** (400, 1.5rem, 1.334): The empty-state product name.
- **Title** (560, 1.25rem, 1.6): The property drawer heading.
- **Body** (400, 1rem, 1.5): The empty-state sentence. Measure stays near 38ch there and 42ch in the empty prompt.
- **Body compact** (400, 0.875rem, 1.43): Secondary sentences, field values, and helper text.
- **Label** (600, 11px, line-height 1, tracking 0.14em, small-caps): The 40px panel titles (“Component Tree”, “Prompt Preview”, “Add Component”).
- **Button** (560, 0.8125rem, tracking 0.01em, no uppercase transform): Text controls.
- **Code** (400, 0.875rem): The prompt, including its line numbers.
- **Code name** (400, 13px, tracking 0): Component names in the tree. Tree text content is the same face at 12px, in string green.

### Named Rules

**The Shared Syntax Rule.** Component names and the prompt use Fira Code Variable. Lexend does not appear inside the prompt or on a component name.

## Layout

The shell is a full-viewport column. The header is 48px, inset 16px on the left and 12px on the right, with a 1px seam along its bottom. Under it, the stage is two panels.

Below 1200px the panels stack: tree first (flex 1), then prompt (flex 1.4), split by a 1px bottom seam. At 1200px and wider they sit in a row, tree flex 1 and prompt flex 2, split by a 1px right seam. That is the one-to-two working split.

Panel headers are 40px, with the same 16px / 12px inset as the app header. The tree canvas is padded 8px and drawn on a 16px grid of 1px seam lines. Nested children indent 22px and hang from a 1px seam. The prompt ruler is a 1px seam at 2.6rem, beside the line numbers.

Header actions cluster on a 2px gap. A 28px empty gap isolates the destructive clear control from undo/redo and from the GitHub link. The property drawer is 400px from the right; below 600px it becomes a full-screen dialog. The add popover is 400px wide and at most 500px tall.

Rhythm follows a 4px module: 2, 4, 8, 12, 16, 24, and 32px. The 12px step is the header gap; 24px and 32px are the empty-state padding.

## Elevation & Depth

Depth is tonal. Ground, panel, and elevated are three flat graphite steps. Popovers, menus, the drawer, tooltips, and alerts use elevated and a 1px seam. Every Material surface in this theme sets its shadow to none.

### Named Rules

**The Flat Seam Rule.** Nothing casts a shadow. A change of graphite, or a 1px seam, is the whole depth system.

## Shapes

Controls, fields, chips, popovers, tooltips, alerts, and tree rows use a 4px radius. Panels, the header, paper, and scrollbar thumbs are square (0).

Borders are 1px and use the seam color. The tree canvas repeats that line as a 16px grid. The prompt repeats it once, as a ruler. Destructive controls use a 1px dashed seam, not a solid one. Focus is a 1px keyword outline, 2px outside the control.

## Components

### Buttons

- **Shape:** 4px radius.
- **Keyword fill:** Ground text on keyword, padding 6px 16px. Hover shifts the fill to Keyword Lift. Disabled washes the fill to keyword at 18% opacity and fades the label. This variant is the empty-state “Add first component” control.
- **Copy:** The same keyword fill, as a small icon button (5px padding). Disabled label is ground at 45% opacity. Copy is the other keyword fill.
- **Outline:** Transparent, paper text, 1px seam border, padding 6px 16px. Hover tints the border keyword and lays an 8% keyword wash. This is the add control inside the popover.
- **Destructive:** Transparent, ash text, 1px dashed seam, 4px radius. Hover and focus turn the border and the icon destructive red and leave the fill empty. Disabled drops the border and fades ash to 40%.
- **Icon:** Ash on transparent, 4px radius, 5px padding in the header (2px on a tree row). Hover uses an 8% keyword wash and paper text.

### Chips

- **Outline:** 4px, 1px seam. The property-count chip is 16px tall, 11px Fira Code, in number violet.
- **Filled:** Keyword at 16% opacity, keyword text, 4px radius. Selected category filters use this. Unselected categories stay outlined.

### Cards / Containers

- **Corner style:** Square panels (0). The add popover and the property drawer are elevated with a 4px radius on the popover and a square drawer edge.
- **Background:** Panel for the tree and the prompt. Elevated for popovers, the drawer, tooltips, and alerts.
- **Shadow strategy:** None. See Elevation & Depth.
- **Border:** 1px seam. The drawer’s border is on the left edge.
- **Internal padding:** Panel headers are 40px tall. Popover and drawer bodies are padded 16px.

### Inputs / Fields

- **Style:** Outlined, 4px radius, ground interior, 1px seam, padding 8.5px 14px on the small fields in the property editor.
- **Hover:** Border shifts from seam to ash.
- **Focus:** Border and label shift to keyword. The global focus ring is a 1px keyword outline, offset 2px.
- **Error:** The field uses the destructive palette role. Alerts keep an elevated ground, a 1px seam, and take their text color from the severity: destructive, warning, string, or keyword.

### Navigation

The header is 48px of ground with a 1px bottom seam. The mark is 28px. Undo, redo, clear, and GitHub are icon buttons. Clear is the dashed destructive control, with 28px of empty space on each side. There is no second navigation tier. Panel titles sit in the 40px header bar, small-caps, ash, tracking 0.14em.

### Tree row

A row is 4px by 8px of padding, 4px radius, transparent at rest. Hover lays an 8% keyword wash. Selected lays keyword at 14% and a 1px keyword border. The name is Fira Code at 13px in keyword; a selected name uses weight 560. Children open on a 200ms grid-row transition. The expander rail is a 1px seam, 22px in from the parent.

### Prompt sheet

The prompt is Fira Code at 0.875rem on a transparent sheet. Keywords, tags, functions, and class names are keyword. Strings are string green. Numbers and booleans are number violet. Comments, punctuation, and line numbers are ash. Operators are paper. A 1px seam stands at 2.6rem as the ruler beside the line numbers. “Fit width” is a toggle: selected state is keyword text and border on a 10% keyword wash.

## Do's and Don'ts

### Do:

- **Do** keep surfaces on Graphite Ground, Graphite Panel, and Raised Graphite, split by a 1px seam.
- **Do** use Syntax Keyword as the only fill, and only for “Add first component” and Copy.
- **Do** make the popover add control an outline with a seam border.
- **Do** draw destructive actions as a dashed seam outline, isolated by empty space, turning destructive red only on hover or focus.
- **Do** set component names and the prompt in Fira Code Variable, and chrome in Lexend Variable, with tabular figures.
- **Do** set panel titles in the 40px bar: 11px, weight 600, tracking 0.14em, small-caps, ash.
- **Do** use a 4px radius on controls and a square corner on panels.
- **Do** stack the tree above the preview below 1200px, and split them one to two from 1200px up.

### Don't:

- **Don't** paint a panel, header, or large region in keyword, string, number, warning, or destructive.
- **Don't** add a drop shadow. Depth is a graphite step or a 1px seam.
- **Don't** round panels, the header, or scrollbar thumbs.
- **Don't** show destructive red on a control that is at rest.
- **Don't** set a second accent. The theme’s secondary and info roles are aliases of keyword, not another hue.
- **Don't** put a small-caps eyebrow above a heading or a form group. Small-caps belong to the 40px panel title.
