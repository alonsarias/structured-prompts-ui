import React, { useState, useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  Popover,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { muiComponents, getAllCategories, searchComponents } from '../data/muiComponents';
import type { MuiComponentDefinition } from '../types';

interface ComponentSelectorProps {
  onAddComponent: (componentName: string, parentId?: string) => void;
  selectedParentId?: string | null;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  onAddComponent,
  selectedParentId,
  open,
  anchorEl,
  onClose,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<MuiComponentDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => getAllCategories(), []);

  const filteredComponents = useMemo(() => {
    let components = searchQuery ? searchComponents(searchQuery) : muiComponents;

    if (selectedCategory) {
      components = components.filter(comp => comp.category === selectedCategory);
    }

    return components;
  }, [searchQuery, selectedCategory]);

  const handleAddComponent = () => {
    if (selectedComponent) {
      onAddComponent(selectedComponent.name, selectedParentId || undefined);
      setSelectedComponent(null);
      setSearchQuery('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedComponent(null);
    setSearchQuery('');
    setSelectedCategory('');
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: 'transparent' }
        }
      }}
      sx={{
        '& .MuiPopover-paper': {
          width: 400,
          maxHeight: 500,
        }
      }}
    >
      <Paper elevation={0} sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            Add Component
          </Typography>
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          {/* Category Filter */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label="All"
                variant={selectedCategory === '' ? 'filled' : 'outlined'}
                color={selectedCategory === '' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('')}
                size="small"
              />
              {categories.map(category => (
                <Chip
                  key={category}
                  label={category}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(category)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>

          {/* Component Search and Selection */}
          <Autocomplete
            options={filteredComponents}
            getOptionLabel={(option) => option.displayName}
            value={selectedComponent}
            onChange={(_, newValue) => setSelectedComponent(newValue)}
            inputValue={searchQuery}
            onInputChange={(_, newValue) => setSearchQuery(newValue)}
            sx={{
              '& .MuiAutocomplete-popupIndicator': {
                color: 'inherit'
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Components"
                placeholder="Type to search components..."
                fullWidth
              />
            )}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box component="li" key={key} {...otherProps}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {option.displayName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={option.category}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
              );
            }}
            noOptionsText="No components found"
          />

          {/* Selected Component Details */}
          {selectedComponent && (
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" gutterBottom>
                {selectedComponent.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedComponent.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Category: {selectedComponent.category} •
                  Children: {selectedComponent.acceptsChildren ? 'Yes' : 'No'} •
                  Text: {selectedComponent.acceptsText ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Add Button */}
          <Button
            variant="contained"
            color='secondary'
            startIcon={<AddIcon />}
            onClick={handleAddComponent}
            disabled={!selectedComponent}
            fullWidth
          >
            Add {selectedComponent?.displayName || 'Component'}
          </Button>
        </Stack>
      </Paper>
    </Popover>
  );
};

export default ComponentSelector;
