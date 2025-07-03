import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  Button,
  Stack,
} from '@mui/material';
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Clear as ClearIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

import { useSpuigBuilder } from './hooks/useSpuigBuilder';
import ComponentSelector from './components/ComponentSelector';
import ComponentTree from './components/ComponentTree';
import PropertyEditor from './components/PropertyEditor';
import SpuigPreview from './components/SpuigPreview';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [addingChildTo, setAddingChildTo] = useState<string | null>(null);

  const {
    components,
    selectedComponent,
    selectedComponentId,
    generatedSpuig,
    validationErrors,
    addComponent,
    removeComponent,
    updateComponent,
    setSelectedComponentId,
    undo,
    redo,
    canUndo,
    canRedo,
    clearAll,
  } = useSpuigBuilder();

  const handleAddComponent = (componentName: string, parentId?: string) => {
    addComponent(componentName, parentId);
    setAddingChildTo(null);
  };

  const handleAddChild = (parentId: string) => {
    setAddingChildTo(parentId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Structured Prompting for UI Generation
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Undo">
              <span>
                <IconButton
                  color="inherit"
                  onClick={undo}
                  disabled={!canUndo}
                  size="small"
                >
                  <UndoIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Redo">
              <span>
                <IconButton
                  color="inherit"
                  onClick={redo}
                  disabled={!canRedo}
                  size="small"
                >
                  <RedoIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Clear all components">
              <IconButton
                color="inherit"
                onClick={clearAll}
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View on GitHub">
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/alonsarias/spuig"
                target="_blank"
                size="small"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 2, height: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
          {/* Left Panel - Component Selector */}
          <Box sx={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <ComponentSelector
                onAddComponent={handleAddComponent}
                selectedParentId={addingChildTo}
              />

              {addingChildTo && (
                <Box sx={{ p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="caption" color="info.contrastText">
                    Adding child to selected component
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setAddingChildTo(null)}
                    sx={{ ml: 1, color: 'info.contrastText' }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Center Panel - Component Tree */}
          <Box sx={{ flex: '0 0 300px' }}>
            <ComponentTree
              components={components}
              selectedComponentId={selectedComponentId}
              onSelectComponent={setSelectedComponentId}
              onDeleteComponent={removeComponent}
              onAddChild={handleAddChild}
              validationErrors={validationErrors}
            />
          </Box>

          {/* Right Panel - Property Editor */}
          <Box sx={{ flex: '0 0 300px' }}>
            <PropertyEditor
              component={selectedComponent}
              onUpdateComponent={updateComponent}
              validationErrors={validationErrors}
            />
          </Box>

          {/* Far Right Panel - SPUIG Preview */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SpuigPreview spuigSyntax={generatedSpuig} />
          </Box>
        </Box>
      </Container>

      {/* Help Text */}
      {components.length === 0 && (
        <Box sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: 400,
          textAlign: 'center',
        }}>
          <Typography variant="body2" color="text.secondary">
            Start by selecting a component from the left panel.
            Build your component hierarchy and see the prompt generated in real-time.
          </Typography>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
