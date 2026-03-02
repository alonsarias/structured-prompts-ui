import { createContext, use } from "react";
import type { SpuigComponent, ValidationError } from "../types";

export interface TreeNodeState {
  component: SpuigComponent;
  level: number;
  isSelected: boolean;
  isRoot: boolean;
  componentErrors: ValidationError[];
  hasErrors: boolean;
  hasWarnings: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  expanded: boolean;
}

/* eslint-disable no-unused-vars -- interface callback params are part of type signature */
export interface TreeNodeActions {
  onToggleExpanded: () => void;
  onAddChildClick: (event: React.MouseEvent<HTMLElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface TreeNodeContextValue {
  state: TreeNodeState;
  actions: TreeNodeActions;
}

export const TreeNodeContext = createContext<TreeNodeContextValue | null>(null);

export function useTreeNodeContext(): TreeNodeContextValue {
  const ctx = use(TreeNodeContext);
  if (!ctx)
    throw new Error("useTreeNodeContext must be used within a TreeNode");
  return ctx;
}
