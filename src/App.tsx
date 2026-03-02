import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Analytics } from '@vercel/analytics/react';

import { SpuigBuilderProvider } from './contexts/SpuigBuilderProvider';
import { useSpuigBuilderContext } from './contexts/SpuigBuilderContext';
import { theme } from './theme';
import ComponentTree from './components/ComponentTree';
import SpuigPreview from './components/SpuigPreview';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpuigBuilderProvider>
        <AppContent />
      </SpuigBuilderProvider>
      <Analytics />
    </ThemeProvider>
  );
}

function AppContent() {
  const { state, actions } = useSpuigBuilderContext();

  return (
    <>
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
                  onClick={actions.undo}
                  disabled={!state.canUndo}
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
                  onClick={actions.redo}
                  disabled={!state.canRedo}
                  size="small"
                >
                  <RedoIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Clear all components">
              <IconButton
                onClick={actions.clearAll}
                size="small"
                color='inherit'
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
          <Box sx={{
            flex: { xs: '1', lg: '1' },
            minHeight: 'auto',
          }}>
            <ComponentTree />
          </Box>

          <Box sx={{
            flex: { xs: '1', lg: '2' },
            minWidth: 0,
            minHeight: 'auto'
          }}>
            <SpuigPreview />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
