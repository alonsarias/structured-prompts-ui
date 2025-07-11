import React, { useState } from 'react';
import {
  ThemeProvider,
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
  Alert,
} from '@mui/material';
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  GitHub as GitHubIcon,
  DeleteSweep as DeleteSweepIcon,
  RocketLaunch as RocketLaunchIcon,
} from '@mui/icons-material';
import { Analytics } from '@vercel/analytics/react';

import { useSpuigBuilder } from './hooks/useSpuigBuilder';
import { theme } from './theme';
import ComponentSelector from './components/ComponentSelector';
import ComponentTree from './components/ComponentTree';
import PropertyEditor from './components/PropertyEditor';
import SpuigPreview from './components/SpuigPreview';

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
    moveComponentUpHandler,
    moveComponentDownHandler,
    canMoveUp,
    canMoveDown,
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
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src="/spuig.svg"
              alt="SPUIG Logo"
              sx={{
                height: 32,
                width: 32,
              }}
            />
          </Box>

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
                <DeleteSweepIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View on GitHub">
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/alonsarias/structured-prompts-ui"
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
      <Container maxWidth={false} sx={{
        py: 3,
        height: { xs: 'auto', lg: 'calc(100vh - 64px)' },
        minHeight: { xs: 'calc(100vh - 64px)', lg: 'auto' }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 3,
          height: { xs: 'auto', lg: '100%' },
          overflow: { xs: 'visible', lg: 'hidden' }
        }}>
          {/* Left Panel - Component Selector */}
          <Box sx={{
            flex: { xs: '1', lg: '0 0 305px' },
            minHeight: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <ComponentSelector
                onAddComponent={handleAddComponent}
                selectedParentId={addingChildTo}
              />

              {addingChildTo && (
                <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'action.active' }}>
                  <Typography variant="caption" color="text.secondary">
                    Adding child to selected component
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setAddingChildTo(null)}
                    sx={{ ml: 1, color: 'text.secondary' }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Center Panel - Component Tree */}
          <Box sx={{
            flex: { xs: '1', lg: '1' },
            minHeight: 'auto',
          }}>
            <ComponentTree
              components={components}
              selectedComponentId={selectedComponentId}
              onSelectComponent={setSelectedComponentId}
              onDeleteComponent={removeComponent}
              onAddChild={handleAddChild}
              onMoveComponentUp={moveComponentUpHandler}
              onMoveComponentDown={moveComponentDownHandler}
              canMoveUp={canMoveUp}
              canMoveDown={canMoveDown}
              validationErrors={validationErrors}
            />
          </Box>

          {/* Right Panel - Property Editor */}
          <Box sx={{
            flex: { xs: '1', lg: '0 0 305px' },
            minHeight: 'auto'
          }}>
            <PropertyEditor
              component={selectedComponent}
              onUpdateComponent={updateComponent}
              validationErrors={validationErrors}
            />
          </Box>

          {/* Far Right Panel - SPUIG Preview */}
          <Box sx={{
            flex: { xs: '1', lg: '1' },
            minWidth: 0,
            minHeight: 'auto'
          }}>
            <SpuigPreview spuigSyntax={generatedSpuig} />
          </Box>
        </Box>
      </Container>

      <Analytics />
    </ThemeProvider>
  );
}

export default App;
