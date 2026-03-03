import React, { useState, useMemo, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import type { SpuigComponent, ValidationError } from "../types";
import { getMuiComponentByName } from "../data/muiComponents";
import { canMoveComponentUp, canMoveComponentDown } from "../utils/spuigUtils";
import ComponentSelector from "./ComponentSelector";
import PropertyEditor from "./PropertyEditor";
import { useSpuigBuilderContext } from "../contexts/SpuigBuilderContext";
import {
  TreeNodeContext,
  useTreeNodeContext,
  type TreeNodeContextValue,
} from "../contexts/TreeNodeContext";

const NOOP = () => {};

function RootNodeActions() {
  const { actions: { onAddChildClick } } = useTreeNodeContext();
  return (
    <Stack direction="row" spacing={0.5}>
      <Tooltip title="Add component">
        <IconButton
          size="small"
          onClick={onAddChildClick}
          sx={{ p: 0.25 }}
          color="inherit"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function ChildNodeActions() {
  const {
    state: { canMoveUp, canMoveDown, component, isSelected },
    actions: { onAddChildClick, onEditClick },
  } = useTreeNodeContext();
  const { actions: builderActions } = useSpuigBuilderContext();
  const muiComponent = getMuiComponentByName(component.componentName);
  const muiAcceptsChildren = muiComponent?.acceptsChildren ?? false;

  return (
    <Stack direction="row" spacing={0.5}>
      <Tooltip title="Edit properties">
        <IconButton
          size="small"
          onClick={onEditClick}
          sx={{ p: 0.25 }}
          color="inherit"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add child component">
        <IconButton
          size="small"
          onClick={onAddChildClick}
          sx={{ p: 0.25 }}
          color="inherit"
          disabled={!muiAcceptsChildren}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Move up">
        <span>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSelected) builderActions.setSelectedComponentId(component.id);
              builderActions.moveComponentUp(component.id);
            }}
            sx={{ p: 0.25 }}
            color="inherit"
            disabled={!canMoveUp}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Move down">
        <span>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSelected) builderActions.setSelectedComponentId(component.id);
              builderActions.moveComponentDown(component.id);
            }}
            sx={{ p: 0.25 }}
            color="inherit"
            disabled={!canMoveDown}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete component">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            if (!isSelected) builderActions.setSelectedComponentId(component.id);
            builderActions.removeComponent(component.id);
          }}
          sx={{ p: 0.25 }}
          color="inherit"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function RootNodeHeader() {
  return (
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography variant="body2" noWrap sx={{ opacity: 0.7 }}>
        Root
      </Typography>
    </Box>
  );
}

function ChildNodeHeader() {
  const {
    state: {
      component,
      isSelected,
      componentErrors,
      hasErrors,
      hasWarnings,
    },
  } = useTreeNodeContext();

  return (
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          variant="body2"
          fontWeight={isSelected ? "medium" : "normal"}
          noWrap
        >
          {component.componentName}
        </Typography>
        {Object.keys(component.props).length > 0 && (
          <Chip
            label={Object.keys(component.props).length}
            size="small"
            variant="outlined"
            sx={{ height: 16, fontSize: "0.625rem" }}
          />
        )}
        {component.textContent && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 100,
            }}
          >
            "{component.textContent}"
          </Typography>
        )}
      </Stack>
      {(hasErrors || hasWarnings) && (
        <Stack direction="row" spacing={0.5} sx={{ mt: 0.25 }}>
          {componentErrors.map((error) => (
            <Tooltip key={error.id} title={error.message}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {error.severity === "error" ? (
                  <ErrorIcon sx={{ fontSize: 12, color: "error.main" }} />
                ) : (
                  <WarningIcon sx={{ fontSize: 12, color: "warning.main" }} />
                )}
              </Box>
            </Tooltip>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function TreeNode({
  component,
  level,
  expanded,
  onToggleExpanded,
}: {
  component: SpuigComponent;
  level: number;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  const { state: builderState, actions: builderActions } =
    useSpuigBuilderContext();
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [propertyEditorAnchorEl, setPropertyEditorAnchorEl] =
    useState<HTMLElement | null>(null);

  const componentErrors: ValidationError[] = [];
  let hasErrors = false;
  let hasWarnings = false;
  for (const error of builderState.validationErrors) {
    if (error.componentId === component.id) {
      componentErrors.push(error);
      if (error.severity === "error") hasErrors = true;
      if (error.severity === "warning") hasWarnings = true;
    }
  }
  const isSelected = builderState.selectedComponentId === component.id;
  const hasChildren = component.children.length > 0;
  const isRoot = !!component.isRoot;

  const canMoveUp = canMoveComponentUp(
    builderState.components,
    component.id
  );
  const canMoveDown = canMoveComponentDown(
    builderState.components,
    component.id
  );

  const handleAddChildClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (!isSelected) {
        builderActions.setSelectedComponentId(component.id);
      }
      setSelectorAnchorEl(event.currentTarget);
      setSelectedParentId(component.id);
    },
    [isSelected, component.id, builderActions]
  );

  const handleCloseSelectorDialog = () => {
    setSelectorAnchorEl(null);
    setSelectedParentId(null);
  };

  const handleEditClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (!isSelected) {
        builderActions.setSelectedComponentId(component.id);
      }
      setPropertyEditorAnchorEl(event.currentTarget);
    },
    [isSelected, component.id, builderActions]
  );

  const handleClosePropertyEditor = () => {
    setPropertyEditorAnchorEl(null);
  };

  const nodeValue: TreeNodeContextValue = useMemo(
    () => ({
      state: {
        component,
        level,
        isSelected,
        isRoot,
        componentErrors,
        hasErrors,
        hasWarnings,
        canMoveUp,
        canMoveDown,
        expanded,
      },
      actions: {
        onToggleExpanded,
        onAddChildClick: handleAddChildClick,
        onEditClick: handleEditClick,
      },
    }),
    [
      component,
      level,
      isSelected,
      isRoot,
      componentErrors,
      hasErrors,
      hasWarnings,
      canMoveUp,
      canMoveDown,
      expanded,
      onToggleExpanded,
      handleAddChildClick,
      handleEditClick,
    ]
  );

  return (
    <TreeNodeContext.Provider value={nodeValue}>
      <Box
        sx={{
          contentVisibility: "auto",
          containIntrinsicSize: "0 40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 0.5,
            px: 1,
            ml: level * 2,
            borderRadius: 1,
            backgroundColor: isSelected ? "action.selected" : "transparent",
            border: isSelected ? "1px solid" : "1px solid transparent",
            borderColor: isSelected ? "primary.main" : "transparent",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: isSelected ? "action.selected" : "action.hover",
            },
          }}
          onClick={() => builderActions.setSelectedComponentId(component.id)}
        >
          {!isRoot && hasChildren && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpanded();
              }}
              sx={{ p: 0.25, mr: 0.5 }}
            >
              {expanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          )}

          {isRoot ? <RootNodeHeader /> : <ChildNodeHeader />}

          {isRoot ? <RootNodeActions /> : <ChildNodeActions />}
        </Box>

        {/* Children - Consider <Activity mode={...}> when upgrading to React 19.2+ to preserve state when collapsing */}
        {expanded && hasChildren && (
          <Box>
            {component.children.map((child) => (
              <TreeNodeContainer
                key={child.id}
                component={child}
                level={level + 1}
              />
            ))}
          </Box>
        )}

        {/* Component Selector Dialog */}
        <ComponentSelector
          open={Boolean(selectorAnchorEl)}
          anchorEl={selectorAnchorEl}
          onClose={handleCloseSelectorDialog}
          selectedParentId={selectedParentId}
        />

        {/* Property Editor Popover */}
        <PropertyEditor
          open={Boolean(propertyEditorAnchorEl)}
          anchorEl={propertyEditorAnchorEl}
          onClose={handleClosePropertyEditor}
        />
      </Box>
    </TreeNodeContext.Provider>
  );
}

function TreeNodeContainer({
  component,
  level,
}: {
  component: SpuigComponent;
  level: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const isRoot = !!component.isRoot;
  const actualExpanded = isRoot ? true : expanded;
  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <TreeNode
      component={component}
      level={level}
      expanded={actualExpanded}
      onToggleExpanded={isRoot ? NOOP : handleToggle}
    />
  );
}

const ComponentTree: React.FC = () => {
  const { state } = useSpuigBuilderContext();
  const { components, validationErrors } = state;

  const globalErrors = validationErrors.filter(
    (error) => error.type === "invalid-hierarchy"
  );

  return (
    <Paper
      elevation={1}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6">Component Tree</Typography>
      </Box>

      {/* Global Errors */}
      {globalErrors.length > 0 && (
        <Box sx={{ p: 1 }}>
          {globalErrors.map((error) => (
            <Alert key={error.id} severity={error.severity} sx={{ mb: 0.5 }}>
              {error.message}
            </Alert>
          ))}
        </Box>
      )}

      {/* Tree Content */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
        {components.map((component) => (
          <TreeNodeContainer
            key={component.id}
            component={component}
            level={0}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ComponentTree;
