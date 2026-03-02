import { createContext, use } from "react";
import type { SpuigComponent, ValidationError } from "../types";

export interface SpuigBuilderState {
  components: SpuigComponent[];
  selectedComponentId: string | null;
  generatedSpuig: string;
  validationErrors: ValidationError[];
  canUndo: boolean;
  canRedo: boolean;
}

export interface SpuigBuilderActions {
  addComponent: (name: string, parentId?: string) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<SpuigComponent>) => void;
  setSelectedComponentId: (id: string | null) => void;
  moveComponentUp: (id: string) => void;
  moveComponentDown: (id: string) => void;
  undo: () => void;
  redo: () => void;
  clearAll: () => void;
}

export interface SpuigBuilderContextValue {
  state: SpuigBuilderState;
  actions: SpuigBuilderActions;
}

export const SpuigBuilderContext =
  createContext<SpuigBuilderContextValue | null>(null);

export function useSpuigBuilderContext(): SpuigBuilderContextValue {
  const ctx = use(SpuigBuilderContext);
  if (!ctx)
    throw new Error(
      "useSpuigBuilderContext must be used within SpuigBuilderProvider"
    );
  return ctx;
}
