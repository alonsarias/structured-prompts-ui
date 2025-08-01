import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Stack,
  Divider,
  Alert,
  Popover,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { SpuigComponent, ValidationError } from '../types';
import { getMuiComponentByName } from '../data/muiComponents';

interface PropertyEditorProps {
  component: SpuigComponent | null;
  onUpdateComponent: (componentId: string, updates: Partial<SpuigComponent>) => void;
  validationErrors: ValidationError[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({
  component,
  onUpdateComponent,
  validationErrors,
  open,
  anchorEl,
  onClose,
}) => {
  const renderPropertyEditorContent = () => {
    if (!component) {
      return (
        <Paper elevation={1} sx={{ p: 2, width: 320, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Select a component to edit its properties
          </Typography>
        </Paper>
      );
    }

    // Handle Root component - show info but no editing
    if (component.isRoot) {
      return (
        <Paper elevation={1} sx={{ p: 2, width: 320, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Root
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The Root acts as the container for your entire component structure.
            It doesn't appear in the generated prompt and only supports adding child components.
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Note:</strong> You cannot edit properties of the Root.
              Select a child component to edit its properties.
            </Typography>
          </Box>
        </Paper>
      );
    }

    const muiComponent = getMuiComponentByName(component.componentName);
    const componentErrors = validationErrors.filter(error => error.componentId === component.id);

    const handlePropChange = (propName: string, value: string | number | boolean | object | null) => {
      const newProps = { ...component.props };

      if (value === '' || value === null || value === undefined) {
        delete newProps[propName];
      } else {
        newProps[propName] = value;
      }

      onUpdateComponent(component.id, { props: newProps });
    };

    const handleTextContentChange = (textContent: string) => {
      onUpdateComponent(component.id, { textContent });
    };

    const renderPropEditor = (propDef: {
      name: string;
      type: string;
      required: boolean;
      description?: string;
      enumValues?: string[];
    }) => {
      const currentValue = component.props[propDef.name] ?? '';
      const hasError = componentErrors.some(error =>
        error.type === 'invalid-prop-type' && error.message.includes(propDef.name)
      );

      switch (propDef.type) {
        case 'boolean':
          return (
            <FormControlLabel
              key={propDef.name}
              control={
                <Switch
                  checked={Boolean(currentValue)}
                  onChange={(e) => handlePropChange(propDef.name, e.target.checked)}
                  size="small"
                />
              }
              label={
                <Box>
                  <Typography variant="body2">
                    {propDef.name}
                    {propDef.required && <span style={{ color: 'red' }}> *</span>}
                  </Typography>
                  {propDef.description && (
                    <Typography variant="caption" color="text.secondary">
                      {propDef.description}
                    </Typography>
                  )}
                </Box>
              }
            />
          );

        case 'enum':
          return (
            <FormControl key={propDef.name} fullWidth size="small" error={hasError}>
              <InputLabel>
                {propDef.name}
                {propDef.required && <span style={{ color: 'red' }}> *</span>}
              </InputLabel>
              <Select
                value={currentValue}
                label={`${propDef.name}${propDef.required ? ' *' : ''}`}
                onChange={(e) => handlePropChange(propDef.name, e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {propDef.enumValues?.map((enumValue: string) => (
                  <MenuItem key={enumValue} value={enumValue}>
                    {enumValue}
                  </MenuItem>
                ))}
              </Select>
              {propDef.description && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {propDef.description}
                </Typography>
              )}
            </FormControl>
          );

        case 'number':
          return (
            <TextField
              key={propDef.name}
              label={`${propDef.name}${propDef.required ? ' *' : ''}`}
              type="number"
              value={currentValue}
              onChange={(e) => {
                const numValue = e.target.value === '' ? null : Number(e.target.value);
                handlePropChange(propDef.name, numValue);
              }}
              fullWidth
              size="small"
              error={hasError}
              helperText={propDef.description}
            />
          );

        default: // string, object, function, node
          return (
            <TextField
              key={propDef.name}
              label={`${propDef.name}${propDef.required ? ' *' : ''}`}
              value={currentValue}
              onChange={(e) => handlePropChange(propDef.name, e.target.value)}
              fullWidth
              size="small"
              error={hasError}
              helperText={propDef.description}
              multiline={propDef.type === 'object'}
              rows={propDef.type === 'object' ? 3 : 1}
            />
          );
      }
    };

    return (
      <Paper elevation={1} sx={{ width: 320, height: 400, display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">
              {component.componentName} Properties
            </Typography>
            <IconButton size="small" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          {muiComponent && (
            <Typography variant="body2" color="text.secondary">
              {muiComponent.description}
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Stack spacing={2}>
            {/* Component Errors */}
            {componentErrors.length > 0 && (
              <Box>
                {componentErrors.map((error, index) => (
                  <Alert
                    key={index}
                    severity={error.severity}
                    sx={{ mb: 1 }}
                  >
                    {error.message}
                  </Alert>
                ))}
              </Box>
            )}

            {/* Text Content */}
            {muiComponent?.acceptsText && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Text Content
                </Typography>
                <TextField
                  label="Text Content"
                  value={component.textContent || ''}
                  onChange={(e) => handleTextContentChange(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Enter text content for this component..."
                />
              </Box>
            )}

            {/* Props */}
            {muiComponent && muiComponent.props.length > 0 && (
              <>
                {muiComponent.acceptsText && <Divider />}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Component Properties
                  </Typography>
                  <Stack spacing={2}>
                    {muiComponent.props.map(renderPropEditor)}
                  </Stack>
                </Box>
              </>
            )}

            {/* Component Info */}
            <Divider />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Component Info
              </Typography>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Category:</strong> {muiComponent?.category}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Accepts Children:</strong> {muiComponent?.acceptsChildren ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Accepts Text:</strong> {muiComponent?.acceptsText ? 'Yes' : 'No'}
                </Typography>
                {muiComponent?.validParents && (
                  <Typography variant="caption" color="text.secondary">
                    <strong>Valid Parents:</strong> {muiComponent.validParents.join(', ')}
                  </Typography>
                )}
                {muiComponent?.validChildren && (
                  <Typography variant="caption" color="text.secondary">
                    <strong>Valid Children:</strong> {muiComponent.validChildren.join(', ')}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    );
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      BackdropProps={{
        invisible: true,
      }}
    >
      {renderPropertyEditorContent()}
    </Popover>
  );
};

export default PropertyEditor;
