import { useMemo } from "react";
import { SpuigBuilderContext } from "./SpuigBuilderContext";
import type { SpuigBuilderContextValue } from "./SpuigBuilderContext";
import { useSpuigBuilder } from "../hooks/useSpuigBuilder";

export function SpuigBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const builder = useSpuigBuilder();

  const value = useMemo<SpuigBuilderContextValue>(
    () => ({
      state: {
        components: builder.components,
        selectedComponentId: builder.selectedComponentId,
        generatedSpuig: builder.generatedSpuig,
        validationErrors: builder.validationErrors,
        canUndo: builder.canUndo,
        canRedo: builder.canRedo,
      },
      actions: {
        addComponent: builder.addComponent,
        removeComponent: builder.removeComponent,
        updateComponent: builder.updateComponent,
        setSelectedComponentId: builder.setSelectedComponentId,
        moveComponentUp: builder.moveComponentUpHandler,
        moveComponentDown: builder.moveComponentDownHandler,
        undo: builder.undo,
        redo: builder.redo,
        clearAll: builder.clearAll,
      },
    }),
    [
      builder.components,
      builder.selectedComponentId,
      builder.generatedSpuig,
      builder.validationErrors,
      builder.canUndo,
      builder.canRedo,
      builder.addComponent,
      builder.removeComponent,
      builder.updateComponent,
      builder.setSelectedComponentId,
      builder.moveComponentUpHandler,
      builder.moveComponentDownHandler,
      builder.undo,
      builder.redo,
      builder.clearAll,
    ]
  );

  return (
    <SpuigBuilderContext.Provider value={value}>
      {children}
    </SpuigBuilderContext.Provider>
  );
}
