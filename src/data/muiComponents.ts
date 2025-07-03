import type { MuiComponentDefinition } from "../types";

export const muiComponents: MuiComponentDefinition[] = [
  // Layout Components
  {
    name: "Box",
    displayName: "Box",
    description: "A wrapper component for most CSS utility needs",
    category: "Layout",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "component",
        type: "string",
        required: false,
        defaultValue: "div",
        description: "The component used for the root node",
      },
      {
        name: "sx",
        type: "object",
        required: false,
        description: "System prop for styling",
      },
    ],
  },
  {
    name: "Container",
    displayName: "Container",
    description: "Centers your content horizontally",
    category: "Layout",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "maxWidth",
        type: "enum",
        required: false,
        enumValues: ["xs", "sm", "md", "lg", "xl", "false"],
        defaultValue: "lg",
        description: "Determine the max-width of the container",
      },
      {
        name: "fixed",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "Set to true to enable fixed width",
      },
    ],
  },
  {
    name: "Grid",
    displayName: "Grid",
    description: "The CSS Grid Layout Module offers a grid-based layout system",
    category: "Layout",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "container",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, the component will have the flex container behavior",
      },
      {
        name: "item",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component will be a flex item",
      },
      {
        name: "xs",
        type: "number",
        required: false,
        description:
          "Defines the number of grids the component is going to use on extra-small devices",
      },
      {
        name: "sm",
        type: "number",
        required: false,
        description:
          "Defines the number of grids the component is going to use on small devices",
      },
      {
        name: "md",
        type: "number",
        required: false,
        description:
          "Defines the number of grids the component is going to use on medium devices",
      },
      {
        name: "lg",
        type: "number",
        required: false,
        description:
          "Defines the number of grids the component is going to use on large devices",
      },
      {
        name: "xl",
        type: "number",
        required: false,
        description:
          "Defines the number of grids the component is going to use on extra-large devices",
      },
      {
        name: "spacing",
        type: "number",
        required: false,
        description: "Defines the space between the type item component",
      },
    ],
  },
  {
    name: "Stack",
    displayName: "Stack",
    description:
      "Manages layout of immediate children along the vertical or horizontal axis",
    category: "Layout",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "direction",
        type: "enum",
        required: false,
        enumValues: ["row", "row-reverse", "column", "column-reverse"],
        defaultValue: "column",
        description: "Defines the flex-direction style property",
      },
      {
        name: "spacing",
        type: "number",
        required: false,
        description: "Defines the space between immediate children",
      },
      {
        name: "alignItems",
        type: "enum",
        required: false,
        enumValues: ["flex-start", "center", "flex-end", "stretch", "baseline"],
        description: "Defines the align-items style property",
      },
      {
        name: "justifyContent",
        type: "enum",
        required: false,
        enumValues: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
          "space-evenly",
        ],
        description: "Defines the justify-content style property",
      },
    ],
  },

  // Navigation Components
  {
    name: "AppBar",
    displayName: "App Bar",
    description: "A bar that typically contains a toolbar",
    category: "Navigation",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "position",
        type: "enum",
        required: false,
        enumValues: ["fixed", "absolute", "sticky", "static", "relative"],
        defaultValue: "fixed",
        description: "The positioning type",
      },
      {
        name: "color",
        type: "enum",
        required: false,
        enumValues: [
          "default",
          "inherit",
          "primary",
          "secondary",
          "transparent",
        ],
        defaultValue: "primary",
        description: "The color of the component",
      },
    ],
  },
  {
    name: "Toolbar",
    displayName: "Toolbar",
    description: "A wrapper for actions inside AppBar",
    category: "Navigation",
    acceptsChildren: true,
    acceptsText: false,
    validParents: ["AppBar"],
    props: [
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["regular", "dense"],
        defaultValue: "regular",
        description: "The variant to use",
      },
    ],
  },
  {
    name: "Tabs",
    displayName: "Tabs",
    description:
      "Tabs make it easy to explore and switch between different views",
    category: "Navigation",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "value",
        type: "number",
        required: false,
        description: "The value of the currently selected Tab",
      },
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["standard", "scrollable", "fullWidth"],
        defaultValue: "standard",
        description: "Determines additional display behavior of the tabs",
      },
      {
        name: "orientation",
        type: "enum",
        required: false,
        enumValues: ["horizontal", "vertical"],
        defaultValue: "horizontal",
        description: "The tabs orientation",
      },
    ],
  },
  {
    name: "Tab",
    displayName: "Tab",
    description: "A single tab element",
    category: "Navigation",
    acceptsChildren: false,
    acceptsText: true,
    validParents: ["Tabs"],
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "The label element",
      },
      {
        name: "value",
        type: "number",
        required: false,
        description: "You can provide your own value",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the tab will be disabled",
      },
    ],
  },

  // Data Display Components
  {
    name: "Card",
    displayName: "Card",
    description: "Cards contain content and actions about a single subject",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "elevation",
        type: "number",
        required: false,
        defaultValue: 1,
        description: "Shadow depth, corresponds to dp in Material Design",
      },
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["elevation", "outlined"],
        defaultValue: "elevation",
        description: "The variant to use",
      },
    ],
  },
  {
    name: "CardHeader",
    displayName: "Card Header",
    description: "The card header",
    category: "Data Display",
    acceptsChildren: false,
    acceptsText: false,
    validParents: ["Card"],
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        description: "The title to display",
      },
      {
        name: "subheader",
        type: "string",
        required: false,
        description: "The subheader to display",
      },
    ],
  },
  {
    name: "CardContent",
    displayName: "Card Content",
    description: "The card content",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: false,
    validParents: ["Card"],
    props: [],
  },
  {
    name: "CardActions",
    displayName: "Card Actions",
    description: "Actions that the user can take related to the card",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: false,
    validParents: ["Card"],
    props: [
      {
        name: "disableSpacing",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the actions do not have additional margin",
      },
    ],
  },
  {
    name: "Typography",
    displayName: "Typography",
    description:
      "Use typography to present your design and content as clearly and efficiently as possible",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: true,
    props: [
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "subtitle1",
          "subtitle2",
          "body1",
          "body2",
          "caption",
          "button",
          "overline",
        ],
        defaultValue: "body1",
        description: "Applies the theme typography styles",
      },
      {
        name: "component",
        type: "string",
        required: false,
        description: "The component used for the root node",
      },
      {
        name: "gutterBottom",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the text will have a bottom margin",
      },
      {
        name: "align",
        type: "enum",
        required: false,
        enumValues: ["inherit", "left", "center", "right", "justify"],
        defaultValue: "inherit",
        description: "Set the text-align on the component",
      },
    ],
  },
  {
    name: "List",
    displayName: "List",
    description: "Lists are continuous, vertical indexes of text or images",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "dense",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, compact vertical padding designed for keyboard and mouse input is used",
      },
      {
        name: "disablePadding",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, vertical padding is removed from the list",
      },
    ],
  },
  {
    name: "ListItem",
    displayName: "List Item",
    description: "A list item",
    category: "Data Display",
    acceptsChildren: true,
    acceptsText: false,
    validParents: ["List"],
    props: [
      {
        name: "disablePadding",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, vertical padding is removed from the list item",
      },
      {
        name: "divider",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, a 1px light border is added to bottom of the list item",
      },
    ],
  },
  {
    name: "ListItemText",
    displayName: "List Item Text",
    description: "The text content of a list item",
    category: "Data Display",
    acceptsChildren: false,
    acceptsText: false,
    validParents: ["ListItem"],
    props: [
      {
        name: "primary",
        type: "string",
        required: false,
        description: "The main content element",
      },
      {
        name: "secondary",
        type: "string",
        required: false,
        description: "The secondary content element",
      },
    ],
  },

  // Inputs Components
  {
    name: "Button",
    displayName: "Button",
    description:
      "Buttons allow users to take actions, and make choices, with a single tap",
    category: "Inputs",
    acceptsChildren: true,
    acceptsText: true,
    props: [
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["contained", "outlined", "text"],
        defaultValue: "text",
        description: "The variant to use",
      },
      {
        name: "color",
        type: "enum",
        required: false,
        enumValues: [
          "inherit",
          "primary",
          "secondary",
          "success",
          "error",
          "info",
          "warning",
        ],
        defaultValue: "primary",
        description: "The color of the component",
      },
      {
        name: "size",
        type: "enum",
        required: false,
        enumValues: ["small", "medium", "large"],
        defaultValue: "medium",
        description: "The size of the component",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component is disabled",
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, the button will take up the full width of its container",
      },
    ],
  },
  {
    name: "TextField",
    displayName: "Text Field",
    description: "Text fields let users enter and edit text",
    category: "Inputs",
    acceptsChildren: false,
    acceptsText: false,
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "The label content",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        description:
          "The short hint displayed in the input before the user enters a value",
      },
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["outlined", "filled", "standard"],
        defaultValue: "outlined",
        description: "The variant to use",
      },
      {
        name: "multiline",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, a textarea element is rendered instead of an input",
      },
      {
        name: "rows",
        type: "number",
        required: false,
        description:
          "Number of rows to display when multiline option is set to true",
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, the input will take up the full width of its container",
      },
      {
        name: "required",
        type: "boolean",
        required: false,
        defaultValue: false,
        description:
          "If true, the label is displayed as required and the input element will be required",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component is disabled",
      },
    ],
  },
  {
    name: "Checkbox",
    displayName: "Checkbox",
    description:
      "Checkboxes allow the user to select one or more items from a set",
    category: "Inputs",
    acceptsChildren: false,
    acceptsText: false,
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        description: "If true, the component is checked",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component is disabled",
      },
      {
        name: "color",
        type: "enum",
        required: false,
        enumValues: [
          "primary",
          "secondary",
          "error",
          "info",
          "success",
          "warning",
        ],
        defaultValue: "primary",
        description: "The color of the component",
      },
      {
        name: "size",
        type: "enum",
        required: false,
        enumValues: ["small", "medium", "large"],
        defaultValue: "medium",
        description: "The size of the component",
      },
    ],
  },
  {
    name: "Switch",
    displayName: "Switch",
    description: "Switches toggle the state of a single setting on or off",
    category: "Inputs",
    acceptsChildren: false,
    acceptsText: false,
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        description: "If true, the component is checked",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component is disabled",
      },
      {
        name: "color",
        type: "enum",
        required: false,
        enumValues: [
          "primary",
          "secondary",
          "error",
          "info",
          "success",
          "warning",
        ],
        defaultValue: "primary",
        description: "The color of the component",
      },
      {
        name: "size",
        type: "enum",
        required: false,
        enumValues: ["small", "medium"],
        defaultValue: "medium",
        description: "The size of the component",
      },
    ],
  },

  // Feedback Components
  {
    name: "Alert",
    displayName: "Alert",
    description:
      "An alert displays a short, important message in a way that attracts the user attention",
    category: "Feedback",
    acceptsChildren: true,
    acceptsText: true,
    props: [
      {
        name: "severity",
        type: "enum",
        required: false,
        enumValues: ["error", "info", "success", "warning"],
        defaultValue: "success",
        description: "The severity of the alert",
      },
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["filled", "outlined", "standard"],
        defaultValue: "standard",
        description: "The variant to use",
      },
      {
        name: "onClose",
        type: "function",
        required: false,
        description: "Callback fired when the close icon is clicked",
      },
    ],
  },
  {
    name: "Snackbar",
    displayName: "Snackbar",
    description: "Snackbars provide brief messages about app processes",
    category: "Feedback",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "open",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, Snackbar is open",
      },
      {
        name: "message",
        type: "string",
        required: false,
        description: "The message to display",
      },
      {
        name: "autoHideDuration",
        type: "number",
        required: false,
        defaultValue: 6000,
        description:
          "The number of milliseconds to wait before automatically calling onClose",
      },
      {
        name: "anchorOrigin",
        type: "object",
        required: false,
        description: "The anchor of the Snackbar",
      },
    ],
  },

  // Surfaces Components
  {
    name: "Paper",
    displayName: "Paper",
    description:
      "The Paper component is a container that renders with elevation and rounded corners",
    category: "Surfaces",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "elevation",
        type: "number",
        required: false,
        defaultValue: 1,
        description: "Shadow depth, corresponds to dp in Material Design",
      },
      {
        name: "variant",
        type: "enum",
        required: false,
        enumValues: ["elevation", "outlined"],
        defaultValue: "elevation",
        description: "The variant to use",
      },
      {
        name: "square",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, rounded corners are disabled",
      },
    ],
  },
  {
    name: "Accordion",
    displayName: "Accordion",
    description:
      "Accordions contain creation flows and allow lightweight editing of an element",
    category: "Surfaces",
    acceptsChildren: true,
    acceptsText: false,
    props: [
      {
        name: "expanded",
        type: "boolean",
        required: false,
        description: "If true, expands the accordion, otherwise collapse it",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "If true, the component is disabled",
      },
    ],
  },
  {
    name: "AccordionSummary",
    displayName: "Accordion Summary",
    description: "The summary of an accordion",
    category: "Surfaces",
    acceptsChildren: true,
    acceptsText: true,
    validParents: ["Accordion"],
    props: [],
  },
  {
    name: "AccordionDetails",
    displayName: "Accordion Details",
    description: "The details of an accordion",
    category: "Surfaces",
    acceptsChildren: true,
    acceptsText: false,
    validParents: ["Accordion"],
    props: [],
  },
];

export const getMuiComponentByName = (
  name: string
): MuiComponentDefinition | undefined => {
  return muiComponents.find((comp) => comp.name === name);
};

export const getMuiComponentsByCategory = (
  category: string
): MuiComponentDefinition[] => {
  return muiComponents.filter((comp) => comp.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = muiComponents.map((comp) => comp.category);
  return Array.from(new Set(categories)).sort();
};

export const searchComponents = (query: string): MuiComponentDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return muiComponents.filter(
    (comp) =>
      comp.name.toLowerCase().includes(lowerQuery) ||
      comp.displayName.toLowerCase().includes(lowerQuery) ||
      comp.description.toLowerCase().includes(lowerQuery)
  );
};
