import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import type { SpuigComponent, ValidationError } from "../types";
import { getMuiComponentByName } from "../data/muiComponents";
import { canMoveComponentUp, canMoveComponentDown } from "../utils/spuigUtils";
import ComponentSelector from "./ComponentSelector";
import PropertyEditor from "./PropertyEditor";

interface ComponentTreeProps {
  components: SpuigComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  onDeleteComponent: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onAddComponent: (componentName: string, parentId?: string) => void;
  onMoveComponentUp: (componentId: string) => void;
  onMoveComponentDown: (componentId: string) => void;
  validationErrors: ValidationError[];
  onUpdateComponent: (
    componentId: string,
    updates: Partial<SpuigComponent>
  ) => void;
}

interface TreeNodeProps {
  component: SpuigComponent;
  level: number;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onAddComponent: (componentName: string, parentId?: string) => void;
  onMoveComponentUp: (componentId: string) => void;
  onMoveComponentDown: (componentId: string) => void;
  validationErrors: ValidationError[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onUpdateComponent: (
    componentId: string,
    updates: Partial<SpuigComponent>
  ) => void;
  allComponents: SpuigComponent[];
}

interface TreeNodeActionsProps {
  isRoot: boolean;
  isSelected: boolean;
  muiAcceptsChildren: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelectComponent: (id: string) => void;
  onAddChildClick: (event: React.MouseEvent<HTMLElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  componentId: string;
}

const TreeNodeActions: React.FC<TreeNodeActionsProps> = ({
  isRoot,
  isSelected,
  muiAcceptsChildren,
  canMoveUp,
  canMoveDown,
  onSelectComponent,
  onAddChildClick,
  onEditClick,
  onMoveUp,
  onMoveDown,
  onDelete,
  componentId,
}) => (
  <Stack direction="row" spacing={0.5}>
    {!isRoot && (
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
    )}
    <Tooltip title={isRoot ? "Add component" : "Add child component"}>
      <IconButton
        size="small"
        onClick={onAddChildClick}
        sx={{ p: 0.25 }}
        color="inherit"
        disabled={!isRoot && !muiAcceptsChildren}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Tooltip>
    {!isRoot && (
      <Tooltip title="Move up">
        <span>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSelected) onSelectComponent(componentId);
              onMoveUp();
            }}
            sx={{ p: 0.25 }}
            color="inherit"
            disabled={!canMoveUp}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    )}
    {!isRoot && (
      <Tooltip title="Move down">
        <span>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSelected) onSelectComponent(componentId);
              onMoveDown();
            }}
            sx={{ p: 0.25 }}
            color="inherit"
            disabled={!canMoveDown}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    )}
    {!isRoot && (
      <Tooltip title="Delete component">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            if (!isSelected) onSelectComponent(componentId);
            onDelete();
          }}
          sx={{ p: 0.25 }}
          color="inherit"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Stack>
);

interface TreeNodeHeaderProps {
  component: SpuigComponent;
  isSelected: boolean;
  isRoot: boolean;
  componentErrors: ValidationError[];
  hasErrors: boolean;
  hasWarnings: boolean;
}

const TreeNodeHeader: React.FC<TreeNodeHeaderProps> = ({
  component,
  isSelected,
  isRoot,
  componentErrors,
  hasErrors,
  hasWarnings,
}) => (
  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        variant="body2"
        fontWeight={isSelected ? "medium" : "normal"}
        noWrap
        sx={{ opacity: isRoot ? 0.7 : 1 }}
      >
        {isRoot ? "Root" : component.componentName}
      </Typography>
      {!isRoot && Object.keys(component.props).length > 0 && (
        <Chip
          label={Object.keys(component.props).length}
          size="small"
          variant="outlined"
          sx={{ height: 16, fontSize: "0.625rem" }}
        />
      )}
      {!isRoot && component.textContent && (
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

const TreeNode: React.FC<TreeNodeProps> = ({
  component,
  level,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onAddChild,
  onAddComponent,
  onMoveComponentUp,
  onMoveComponentDown,
  validationErrors,
  expanded,
  onToggleExpanded,
  onUpdateComponent,
  allComponents,
}) => {
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [propertyEditorAnchorEl, setPropertyEditorAnchorEl] =
    useState<HTMLElement | null>(null);

  const muiComponent = getMuiComponentByName(component.componentName);
  const componentErrors = validationErrors.filter(
    (error) => error.componentId === component.id
  );
  const hasErrors = componentErrors.some((error) => error.severity === "error");
  const hasWarnings = componentErrors.some(
    (error) => error.severity === "warning"
  );
  const isSelected = selectedComponentId === component.id;
  const hasChildren = component.children.length > 0;
  const isRoot = component.isRoot;

  // Calculate move capabilities for this specific component
  const canMoveUp = canMoveComponentUp(allComponents, component.id);
  const canMoveDown = canMoveComponentDown(allComponents, component.id);

  const handleAddChildClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!isSelected) {
      onSelectComponent(component.id);
    }
    setSelectorAnchorEl(event.currentTarget);
    setSelectedParentId(component.id);
    onAddChild(component.id);
  };

  const handleCloseSelectorDialog = () => {
    setSelectorAnchorEl(null);
    setSelectedParentId(null);
  };

  const handleAddComponent = (componentName: string, parentId?: string) => {
    onAddComponent(componentName, parentId);
    handleCloseSelectorDialog();
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!isSelected) {
      onSelectComponent(component.id);
    }
    setPropertyEditorAnchorEl(event.currentTarget);
  };

  const handleClosePropertyEditor = () => {
    setPropertyEditorAnchorEl(null);
  };

  return (
    <Box>
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
        onClick={() => onSelectComponent(component.id)}
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

        <TreeNodeHeader
          component={component}
          isSelected={isSelected}
          isRoot={!!isRoot}
          componentErrors={componentErrors}
          hasErrors={hasErrors}
          hasWarnings={hasWarnings}
        />

        <TreeNodeActions
          isRoot={!!isRoot}
          isSelected={isSelected}
          muiAcceptsChildren={muiComponent?.acceptsChildren ?? false}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onSelectComponent={onSelectComponent}
          onAddChildClick={handleAddChildClick}
          onEditClick={handleEditClick}
          onMoveUp={() => onMoveComponentUp(component.id)}
          onMoveDown={() => onMoveComponentDown(component.id)}
          onDelete={() => onDeleteComponent(component.id)}
          componentId={component.id}
        />
      </Box>

      {/* Children */}
      {expanded && hasChildren && (
        <Box>
          {component.children.map((child) => (
            <TreeNodeContainer
              key={child.id}
              component={child}
              level={level + 1}
              selectedComponentId={selectedComponentId}
              onSelectComponent={onSelectComponent}
              onDeleteComponent={onDeleteComponent}
              onAddChild={onAddChild}
              onAddComponent={onAddComponent}
              onMoveComponentUp={onMoveComponentUp}
              onMoveComponentDown={onMoveComponentDown}
              validationErrors={validationErrors}
              onUpdateComponent={onUpdateComponent}
              allComponents={allComponents}
            />
          ))}
        </Box>
      )}

      {/* Component Selector Dialog */}
      <ComponentSelector
        open={Boolean(selectorAnchorEl)}
        anchorEl={selectorAnchorEl}
        onClose={handleCloseSelectorDialog}
        onAddComponent={handleAddComponent}
        selectedParentId={selectedParentId}
      />

      {/* Property Editor Popover */}
      <PropertyEditor
        open={Boolean(propertyEditorAnchorEl)}
        anchorEl={propertyEditorAnchorEl}
        onClose={handleClosePropertyEditor}
        component={component}
        onUpdateComponent={onUpdateComponent}
        validationErrors={validationErrors}
      />
    </Box>
  );
};

// Container component to manage expanded state
const TreeNodeContainer: React.FC<
  Omit<TreeNodeProps, "expanded" | "onToggleExpanded">
> = (props) => {
  const [expanded, setExpanded] = React.useState(true);

  // Root components should always be expanded
  const isRoot = props.component.isRoot;
  const actualExpanded = isRoot ? true : expanded;
  const handleToggle = isRoot ? () => {} : () => setExpanded(!expanded);

  return (
    <TreeNode
      {...props}
      expanded={actualExpanded}
      onToggleExpanded={handleToggle}
    />
  );
};

const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onAddChild,
  onAddComponent,
  onMoveComponentUp,
  onMoveComponentDown,
  validationErrors,
  onUpdateComponent,
}) => {
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
            selectedComponentId={selectedComponentId}
            onSelectComponent={onSelectComponent}
            onDeleteComponent={onDeleteComponent}
            onAddChild={onAddChild}
            onAddComponent={onAddComponent}
            onMoveComponentUp={onMoveComponentUp}
            onMoveComponentDown={onMoveComponentDown}
            validationErrors={validationErrors}
            onUpdateComponent={onUpdateComponent}
            allComponents={components}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ComponentTree;
