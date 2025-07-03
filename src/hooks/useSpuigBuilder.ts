import { useState, useCallback, useMemo } from "react";
import type { SpuigComponent } from "../types";
import {
  generateSpuigSyntax,
  validateAllComponents,
  findComponentById,
  removeComponentById,
  updateComponentById,
  addChildToComponent,
  createEmptyComponent,
} from "../utils/spuigUtils";

export const useSpuigBuilder = () => {
  const [components, setComponents] = useState<SpuigComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [history, setHistory] = useState<SpuigComponent[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const selectedComponent = useMemo(() => {
    if (!selectedComponentId) return null;
    return findComponentById(components, selectedComponentId);
  }, [components, selectedComponentId]);

  const generatedSpuig = useMemo(() => {
    return generateSpuigSyntax(components);
  }, [components]);

  const validationErrors = useMemo(() => {
    return validateAllComponents(components);
  }, [components]);

  const saveToHistory = useCallback(
    (newComponents: SpuigComponent[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push([...newComponents]);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const addComponent = useCallback(
    (componentName: string, parentId?: string) => {
      const newComponent = createEmptyComponent(componentName);

      let newComponents: SpuigComponent[];
      if (parentId) {
        newComponents = addChildToComponent(components, parentId, newComponent);
      } else {
        newComponents = [...components, newComponent];
      }

      saveToHistory(components);
      setComponents(newComponents);
      setSelectedComponentId(newComponent.id);
    },
    [components, saveToHistory]
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      const newComponents = removeComponentById(components, componentId);
      saveToHistory(components);
      setComponents(newComponents);

      if (selectedComponentId === componentId) {
        setSelectedComponentId(null);
      }
    },
    [components, selectedComponentId, saveToHistory]
  );

  const updateComponent = useCallback(
    (componentId: string, updates: Partial<SpuigComponent>) => {
      const newComponents = updateComponentById(
        components,
        componentId,
        updates
      );
      saveToHistory(components);
      setComponents(newComponents);
    },
    [components, saveToHistory]
  );

  const moveComponent = useCallback(
    (componentId: string, newParentId: string | null, index?: number) => {
      // Remove from current location
      const component = findComponentById(components, componentId);
      if (!component) return;

      let newComponents = removeComponentById(components, componentId);

      // Add to new location
      if (newParentId) {
        newComponents = addChildToComponent(
          newComponents,
          newParentId,
          component
        );
      } else {
        if (index !== undefined) {
          newComponents.splice(index, 0, component);
        } else {
          newComponents.push(component);
        }
      }

      saveToHistory(components);
      setComponents(newComponents);
    },
    [components, saveToHistory]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents([...history[historyIndex - 1]]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents([...history[historyIndex + 1]]);
    }
  }, [history, historyIndex]);

  const clearAll = useCallback(() => {
    saveToHistory(components);
    setComponents([]);
    setSelectedComponentId(null);
  }, [components, saveToHistory]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    // State
    components,
    selectedComponent,
    selectedComponentId,
    generatedSpuig,
    validationErrors,

    // Actions
    addComponent,
    removeComponent,
    updateComponent,
    moveComponent,
    setSelectedComponentId,

    // History
    undo,
    redo,
    canUndo,
    canRedo,
    clearAll,
  };
};
