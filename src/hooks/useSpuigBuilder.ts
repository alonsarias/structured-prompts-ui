import { useState, useCallback, useMemo, useRef } from "react";
import type { SpuigComponent } from "../types";
import {
  generateSpuigSyntax,
  validateAllComponents,
  findComponentById,
  removeComponentById,
  updateComponentById,
  addChildToComponent,
  createEmptyComponent,
  createRootComponent,
  moveComponentUp,
  moveComponentDown,
  canMoveComponentUp,
  canMoveComponentDown,
} from "../utils/spuigUtils";

export const useSpuigBuilder = () => {
  const [components, setComponents] = useState<SpuigComponent[]>(() => [
    createRootComponent(),
  ]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [historyState, setHistoryState] = useState<{
    entries: SpuigComponent[][];
    index: number;
  }>({ entries: [], index: -1 });

  const componentsRef = useRef(components);
  componentsRef.current = components;

  const historyStateRef = useRef(historyState);
  historyStateRef.current = historyState;

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

  const saveToHistory = useCallback(() => {
    const currentComponents = componentsRef.current;
    setHistoryState((prev) => {
      const newEntries = prev.entries.slice(0, prev.index + 1);
      newEntries.push([...currentComponents]);
      return { entries: newEntries, index: newEntries.length - 1 };
    });
  }, []);

  const addComponent = useCallback(
    (componentName: string, parentId?: string) => {
      const newComponent = createEmptyComponent(componentName);
      saveToHistory();
      setComponents((prev) => {
        let newComponents: SpuigComponent[];
        if (parentId) {
          newComponents = addChildToComponent(prev, parentId, newComponent);
        } else {
          const rootComponent = prev.find((c) => c.isRoot);
          if (rootComponent) {
            newComponents = addChildToComponent(
              prev,
              rootComponent.id,
              newComponent
            );
          } else {
            const newRoot = createRootComponent();
            newRoot.children.push(newComponent);
            newComponents = [newRoot];
          }
        }
        return newComponents;
      });
      setSelectedComponentId(newComponent.id);
    },
    [saveToHistory]
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      saveToHistory();
      setComponents((prev) => {
        const componentToRemove = findComponentById(prev, componentId);
        if (componentToRemove?.isRoot) {
          return prev;
        }
        return removeComponentById(prev, componentId);
      });
      setSelectedComponentId((prev) => (prev === componentId ? null : prev));
    },
    [saveToHistory]
  );

  const updateComponent = useCallback(
    (componentId: string, updates: Partial<SpuigComponent>) => {
      saveToHistory();
      setComponents((prev) =>
        updateComponentById(prev, componentId, updates)
      );
    },
    [saveToHistory]
  );

  const moveComponent = useCallback(
    (componentId: string, newParentId: string | null, index?: number) => {
      saveToHistory();
      setComponents((prev) => {
        const component = findComponentById(prev, componentId);
        if (!component) return prev;

        let newComponents = removeComponentById(prev, componentId);

        if (newParentId) {
          newComponents = addChildToComponent(
            newComponents,
            newParentId,
            component
          );
        } else {
          if (index !== undefined) {
            const arr = [...newComponents];
            arr.splice(index, 0, component);
            newComponents = arr;
          } else {
            newComponents = [...newComponents, component];
          }
        }
        return newComponents;
      });
    },
    [saveToHistory]
  );

  const moveComponentUpHandler = useCallback(
    (componentId: string) => {
      saveToHistory();
      setComponents((prev) => {
        if (!canMoveComponentUp(prev, componentId)) return prev;
        return moveComponentUp(prev, componentId);
      });
    },
    [saveToHistory]
  );

  const moveComponentDownHandler = useCallback(
    (componentId: string) => {
      saveToHistory();
      setComponents((prev) => {
        if (!canMoveComponentDown(prev, componentId)) return prev;
        return moveComponentDown(prev, componentId);
      });
    },
    [saveToHistory]
  );

  const undo = useCallback(() => {
    const { entries, index } = historyStateRef.current;
    if (index <= 0) return;
    setHistoryState((prev) => ({ ...prev, index: prev.index - 1 }));
    setComponents([...entries[index - 1]]);
  }, []);

  const redo = useCallback(() => {
    const { entries, index } = historyStateRef.current;
    if (index >= entries.length - 1) return;
    setHistoryState((prev) => ({ ...prev, index: prev.index + 1 }));
    setComponents([...entries[index + 1]]);
  }, []);

  const clearAll = useCallback(() => {
    saveToHistory();
    setComponents([createRootComponent()]);
    setSelectedComponentId(null);
  }, [saveToHistory]);

  const canUndo = historyState.index > 0;
  const canRedo = historyState.index < historyState.entries.length - 1;

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
    moveComponentUpHandler,
    moveComponentDownHandler,

    // Helpers
    canMoveUp: selectedComponentId
      ? canMoveComponentUp(components, selectedComponentId)
      : false,
    canMoveDown: selectedComponentId
      ? canMoveComponentDown(components, selectedComponentId)
      : false,

    // History
    undo,
    redo,
    canUndo,
    canRedo,
    clearAll,
  };
};
