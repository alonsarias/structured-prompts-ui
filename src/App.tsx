import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Analytics } from "@vercel/analytics/react";

import { SpuigBuilderProvider } from "./contexts/SpuigBuilderProvider";
import { useSpuigBuilderContext } from "./contexts/SpuigBuilderContext";
import { theme } from "./theme";
import ComponentTree from "./components/ComponentTree";
import SpuigPreview from "./components/SpuigPreview";
import ConfirmActionDialog from "./components/ConfirmActionDialog";

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
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <Box className="console-shell">
      <Box component="header" className="console-header">
        <Box
          component="img"
          src="/spuig.svg"
          alt="SPUIG Logo"
          className="console-mark"
        />

        <Stack
          direction="row"
          className="console-header-actions"
          alignItems="center"
        >
          <Tooltip title="Undo">
            <span>
              <IconButton
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
                onClick={actions.redo}
                disabled={!state.canRedo}
                size="small"
              >
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>

          <span className="console-gap" aria-hidden="true" />

          <Tooltip title="Clear all components">
            <IconButton
              className="console-destructive"
              onClick={() => setConfirmClear(true)}
              size="small"
              sx={{ marginLeft: 0 }}
              aria-label="Clear all components"
            >
              <DeleteSweepIcon />
            </IconButton>
          </Tooltip>

          <span className="console-gap" aria-hidden="true" />

          <Tooltip title="View on GitHub">
            <IconButton
              component="a"
              href="https://github.com/alonsarias/structured-prompts-ui"
              target="_blank"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box className="console-stage">
        <Box className="console-panel console-panel-tree">
          <ComponentTree />
        </Box>
        <Box className="console-panel console-panel-preview">
          <SpuigPreview />
        </Box>
      </Box>

      <ConfirmActionDialog
        open={confirmClear}
        title="Clear all components"
        description="This removes every component from the tree. You can undo this afterward."
        confirmLabel="Clear all"
        onClose={() => setConfirmClear(false)}
        onConfirm={() => {
          actions.clearAll();
          setConfirmClear(false);
        }}
      />
    </Box>
  );
}

export default App;
