// Core SPUIG Types
export type PropValue = string | number | boolean | object | null | undefined;

export interface SpuigComponent {
  id: string;
  componentName: string;
  props: Record<string, PropValue>;
  textContent?: string;
  children: SpuigComponent[];
  parentId?: string;
  isRoot?: boolean;
}

// Material UI Component Definitions
export interface MuiPropDefinition {
  name: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "enum"
    | "object"
    | "function"
    | "node";
  required: boolean;
  defaultValue?: PropValue;
  description?: string;
  enumValues?: string[];
}

export interface MuiComponentDefinition {
  name: string;
  displayName: string;
  description: string;
  category: string;
  props: MuiPropDefinition[];
  acceptsChildren: boolean;
  acceptsText: boolean;
  validParents?: string[];
  validChildren?: string[];
}

// Application State
export interface AppState {
  selectedComponent: SpuigComponent | null;
  componentTree: SpuigComponent[];
  generatedSpuig: string;
  errors: ValidationError[];
}

export interface ValidationError {
  id: string;
  componentId: string;
  type:
    | "missing-required-prop"
    | "invalid-prop-type"
    | "invalid-hierarchy"
    | "unknown-component";
  message: string;
  severity: "error" | "warning";
}

// UI State
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface PropFormField {
  name: string;
  type: "text" | "number" | "boolean" | "select" | "multiline";
  value: PropValue;
  options?: string[];
  required: boolean;
  error?: string;
}
