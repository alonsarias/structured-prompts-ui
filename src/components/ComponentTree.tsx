import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import type { SpuigComponent, ValidationError } from '../types';
import { getMuiComponentByName } from '../data/muiComponents';

interface ComponentTreeProps {
  components: SpuigComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  onDeleteComponent: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onMoveComponentUp: (componentId: string) => void;
  onMoveComponentDown: (componentId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  validationErrors: ValidationError[];
}

interface TreeNodeProps {
  component: SpuigComponent;
  level: number;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onMoveComponentUp: (componentId: string) => void;
  onMoveComponentDown: (componentId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  validationErrors: ValidationError[];
  expanded: boolean;
  onToggleExpanded: () => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  component,
  level,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onAddChild,
  onMoveComponentUp,
  onMoveComponentDown,
  canMoveUp,
  canMoveDown,
  validationErrors,
  expanded,
  onToggleExpanded,
}) => {
  const muiComponent = getMuiComponentByName(component.componentName);
  const componentErrors = validationErrors.filter(error => error.componentId === component.id);
  const hasErrors = componentErrors.some(error => error.severity === 'error');
  const hasWarnings = componentErrors.some(error => error.severity === 'warning');
  const isSelected = selectedComponentId === component.id;
  const hasChildren = component.children.length > 0;
  const isRoot = component.isRoot;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 0.5,
          px: 1,
          ml: level * 2,
          borderRadius: 1,
          backgroundColor: isSelected ? 'action.selected' : 'transparent',
          border: isSelected ? '1px solid' : '1px solid transparent',
          borderColor: isSelected ? 'primary.main' : 'transparent',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: isSelected ? 'action.selected' : 'action.hover',
          },
        }}
        onClick={() => onSelectComponent(component.id)}
      >
        {/* Expand/Collapse Icon */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpanded();
          }}
          sx={{
            p: 0.25,
            mr: 0.5,
            visibility: hasChildren ? 'visible' : 'hidden',
          }}
        >
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>

        {/* Component Info */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body2"
              fontWeight={isSelected ? 'medium' : 'normal'}
              noWrap
              sx={{
                fontStyle: isRoot ? 'italic' : 'normal',
                opacity: isRoot ? 0.7 : 1,
              }}
            >
              {isRoot ? 'Root' : component.componentName}
            </Typography>

            {/* Props indicator - hide for root */}
            {!isRoot && Object.keys(component.props).length > 0 && (
              <Chip
                label={Object.keys(component.props).length}
                size="small"
                variant="outlined"
                sx={{ height: 16, fontSize: '0.625rem' }}
              />
            )}

            {/* Text content indicator - hide for root */}
            {!isRoot && component.textContent && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontStyle: 'italic',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 100,
                }}
              >
                "{component.textContent}"
              </Typography>
            )}
          </Stack>

          {/* Error/Warning indicators */}
          {(hasErrors || hasWarnings) && (
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.25 }}>
              {componentErrors.map((error, index) => (
                <Tooltip key={index} title={error.message}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {error.severity === 'error' ? (
                      <ErrorIcon sx={{ fontSize: 12, color: 'error.main' }} />
                    ) : (
                      <WarningIcon sx={{ fontSize: 12, color: 'warning.main' }} />
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          )}
        </Box>

        {/* Actions */}
        <Stack direction="row" spacing={0.5}>
          {/* Move Up Button - hidden for root */}
          {!isRoot && isSelected && (
            <Tooltip title="Move up">
              <span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveComponentUp(component.id);
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

          {/* Move Down Button - hidden for root */}
          {!isRoot && isSelected && (
            <Tooltip title="Move down">
              <span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveComponentDown(component.id);
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

          {/* Add Child Button - always available for root, conditionally for others */}
          {(isRoot || (muiComponent?.acceptsChildren)) && (
            <Tooltip title="Add child component">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChild(component.id);
                }}
                sx={{ p: 0.25 }}
                color="inherit"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {/* Delete Button - hidden for root */}
          {!isRoot && (
            <Tooltip title="Delete component">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteComponent(component.id);
                }}
                sx={{ p: 0.25 }}
                color="inherit"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
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
              onMoveComponentUp={onMoveComponentUp}
              onMoveComponentDown={onMoveComponentDown}
              canMoveUp={canMoveUp}
              canMoveDown={canMoveDown}
              validationErrors={validationErrors}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// Container component to manage expanded state
const TreeNodeContainer: React.FC<Omit<TreeNodeProps, 'expanded' | 'onToggleExpanded'>> = (props) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <TreeNode
      {...props}
      expanded={expanded}
      onToggleExpanded={() => setExpanded(!expanded)}
    />
  );
};

const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onAddChild,
  onMoveComponentUp,
  onMoveComponentDown,
  canMoveUp,
  canMoveDown,
  validationErrors,
}) => {
  const globalErrors = validationErrors.filter(error => error.type === 'invalid-hierarchy');

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">Component Tree</Typography>
        {components.length === 1 && components[0]?.isRoot && components[0].children.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No components added yet. Use the component selector to add your first component.
          </Typography>
        )}
      </Box>

      {/* Global Errors */}
      {globalErrors.length > 0 && (
        <Box sx={{ p: 1 }}>
          {globalErrors.map((error, index) => (
            <Alert
              key={index}
              severity={error.severity}
              sx={{ mb: 0.5 }}
            >
              {error.message}
            </Alert>
          ))}
        </Box>
      )}

      {/* Tree Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
        {components.map((component) => (
          <TreeNodeContainer
            key={component.id}
            component={component}
            level={0}
            selectedComponentId={selectedComponentId}
            onSelectComponent={onSelectComponent}
            onDeleteComponent={onDeleteComponent}
            onAddChild={onAddChild}
            onMoveComponentUp={onMoveComponentUp}
            onMoveComponentDown={onMoveComponentDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            validationErrors={validationErrors}
          />
        ))}
      </Box>

      {/* Clear selection */}
      {selectedComponentId && (
        <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ cursor: 'pointer' }}
            onClick={() => onSelectComponent(null)}
          >
            Clear selection
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ComponentTree;
