import type { SpuigComponent, ValidationError, PropValue } from "../types";
import { getMuiComponentByName } from "../data/muiComponents";

export const generateSpuigSyntax = (components: SpuigComponent[]): string => {
  const generateComponentSyntax = (
    component: SpuigComponent,
    indentLevel: number = 0
  ): string => {
    const indent = "  ".repeat(indentLevel);
    let line = `${indent}${component.componentName}`;

    // Add props
    Object.entries(component.props).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "string") {
          line += ` ${key}="${value}"`;
        } else if (typeof value === "boolean") {
          line += ` ${key}={${value}}`;
        } else if (typeof value === "number") {
          line += ` ${key}={${value}}`;
        } else {
          line += ` ${key}={${JSON.stringify(value)}}`;
        }
      }
    });

    // Add text content
    if (component.textContent && component.textContent.trim()) {
      line += ` "${component.textContent}"`;
    }

    let result = line;

    // Add children
    if (component.children.length > 0) {
      component.children.forEach((child) => {
        result += "\n" + generateComponentSyntax(child, indentLevel + 1);
      });
    }

    return result;
  };

  return components
    .map((component) => generateComponentSyntax(component))
    .join("\n");
};

export const validateComponent = (
  component: SpuigComponent
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const muiComponent = getMuiComponentByName(component.componentName);

  if (!muiComponent) {
    errors.push({
      id: `${component.id}-unknown-component`,
      componentId: component.id,
      type: "unknown-component",
      message: `Unknown component: ${component.componentName}`,
      severity: "error",
    });
    return errors;
  }

  // Check required props
  muiComponent.props.forEach((propDef) => {
    if (propDef.required && !(propDef.name in component.props)) {
      errors.push({
        id: `${component.id}-missing-${propDef.name}`,
        componentId: component.id,
        type: "missing-required-prop",
        message: `Missing required prop: ${propDef.name}`,
        severity: "error",
      });
    }
  });

  // Validate prop types
  Object.entries(component.props).forEach(([propName, propValue]) => {
    const propDef = muiComponent.props.find((p) => p.name === propName);
    if (
      propDef &&
      propValue !== undefined &&
      propValue !== null &&
      propValue !== ""
    ) {
      const isValid = validatePropType(
        propValue,
        propDef.type,
        propDef.enumValues
      );
      if (!isValid) {
        errors.push({
          id: `${component.id}-invalid-${propName}`,
          componentId: component.id,
          type: "invalid-prop-type",
          message: `Invalid value for prop ${propName}. Expected ${
            propDef.type
          }${propDef.enumValues ? ` (${propDef.enumValues.join(", ")})` : ""}`,
          severity: "error",
        });
      }
    }
  });

  // Check if component accepts text content
  if (component.textContent && !muiComponent.acceptsText) {
    errors.push({
      id: `${component.id}-invalid-text`,
      componentId: component.id,
      type: "invalid-hierarchy",
      message: `Component ${component.componentName} does not accept text content`,
      severity: "warning",
    });
  }

  // Check if component accepts children
  if (component.children.length > 0 && !muiComponent.acceptsChildren) {
    errors.push({
      id: `${component.id}-invalid-children`,
      componentId: component.id,
      type: "invalid-hierarchy",
      message: `Component ${component.componentName} does not accept children`,
      severity: "warning",
    });
  }

  return errors;
};

export const validateHierarchy = (
  components: SpuigComponent[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const validateComponentHierarchy = (
    component: SpuigComponent,
    parent?: SpuigComponent
  ) => {
    const muiComponent = getMuiComponentByName(component.componentName);
    const parentMuiComponent = parent
      ? getMuiComponentByName(parent.componentName)
      : null;

    if (muiComponent && parent && parentMuiComponent) {
      // Check if this component can be a child of the parent
      if (
        muiComponent.validParents &&
        !muiComponent.validParents.includes(parent.componentName)
      ) {
        errors.push({
          id: `${component.id}-invalid-parent`,
          componentId: component.id,
          type: "invalid-hierarchy",
          message: `${component.componentName} cannot be a child of ${
            parent.componentName
          }. Valid parents: ${muiComponent.validParents.join(", ")}`,
          severity: "error",
        });
      }

      // Check if parent can have this child
      if (
        parentMuiComponent.validChildren &&
        !parentMuiComponent.validChildren.includes(component.componentName)
      ) {
        errors.push({
          id: `${component.id}-invalid-child`,
          componentId: component.id,
          type: "invalid-hierarchy",
          message: `${parent.componentName} cannot have ${
            component.componentName
          } as child. Valid children: ${parentMuiComponent.validChildren.join(
            ", "
          )}`,
          severity: "error",
        });
      }
    }

    // Recursively validate children
    component.children.forEach((child) => {
      validateComponentHierarchy(child, component);
    });
  };

  components.forEach((component) => {
    validateComponentHierarchy(component);
  });

  return errors;
};

export const validateAllComponents = (
  components: SpuigComponent[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const validateRecursively = (component: SpuigComponent) => {
    errors.push(...validateComponent(component));
    component.children.forEach(validateRecursively);
  };

  components.forEach(validateRecursively);
  errors.push(...validateHierarchy(components));

  return errors;
};

const validatePropType = (
  value: unknown,
  type: string,
  enumValues?: string[]
): boolean => {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && !isNaN(value);
    case "boolean":
      return typeof value === "boolean";
    case "enum":
      return enumValues ? enumValues.includes(String(value)) : true;
    case "object":
      return typeof value === "object";
    case "function":
      return typeof value === "function";
    case "node":
      return true; // JSX nodes can be various types
    default:
      return true;
  }
};

export const createEmptyComponent = (componentName: string): SpuigComponent => {
  const muiComponent = getMuiComponentByName(componentName);
  const props: Record<
    string,
    string | number | boolean | object | null | undefined
  > = {};

  // Set default values for props
  if (muiComponent) {
    muiComponent.props.forEach((propDef) => {
      if (propDef.defaultValue !== undefined) {
        props[propDef.name] = propDef.defaultValue;
      }
    });
  }

  // Generate UUID (fallback for environments without crypto.randomUUID)
  const generateId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  return {
    id: generateId(),
    componentName,
    props,
    textContent: "",
    children: [],
  };
};

export const findComponentById = (
  components: SpuigComponent[],
  id: string
): SpuigComponent | null => {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    const found = findComponentById(component.children, id);
    if (found) {
      return found;
    }
  }
  return null;
};

export const removeComponentById = (
  components: SpuigComponent[],
  id: string
): SpuigComponent[] => {
  return components
    .filter((component) => component.id !== id)
    .map((component) => ({
      ...component,
      children: removeComponentById(component.children, id),
    }));
};

export const updateComponentById = (
  components: SpuigComponent[],
  id: string,
  updates: Partial<SpuigComponent>
): SpuigComponent[] => {
  return components.map((component) => {
    if (component.id === id) {
      return { ...component, ...updates };
    }
    return {
      ...component,
      children: updateComponentById(component.children, id, updates),
    };
  });
};

export const addChildToComponent = (
  components: SpuigComponent[],
  parentId: string,
  child: SpuigComponent
): SpuigComponent[] => {
  return components.map((component) => {
    if (component.id === parentId) {
      return {
        ...component,
        children: [...component.children, { ...child, parentId }],
      };
    }
    return {
      ...component,
      children: addChildToComponent(component.children, parentId, child),
    };
  });
};
