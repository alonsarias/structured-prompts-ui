import React, { useState, lazy, Suspense } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { useSpuigBuilderContext } from "../contexts/SpuigBuilderContext";

const CodeHighlighter = lazy(() => import("./CodeHighlighter"));

const SpuigPreview: React.FC = () => {
  const { state } = useSpuigBuilderContext();
  const spuigSyntax = state.generatedSpuig;
  const [copySuccess, setCopySuccess] = useState(false);

  const getFullPrompt = () => {
    return spuigSyntax
      ? `Convert the following structure into a component:\n\n${spuigSyntax}`
      : "";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullPrompt());
      setCopySuccess(true);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([getFullPrompt()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spuig-prompt.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCloseCopySnackbar = () => {
    setCopySuccess(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Prompt Preview</Typography>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopy} size="small" color="inherit">
              <CopyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download as file">
            <IconButton onClick={handleDownload} size="small" color="inherit">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Suspense
          fallback={
            <Box
              sx={{ p: 2, fontFamily: "monospace", fontSize: "0.875rem", opacity: 0.5 }}
            >
              Loading preview...
            </Box>
          }
        >
          <CodeHighlighter
            code={
              spuigSyntax
                ? `Convert the following structure into a component:\n\n${spuigSyntax}`
                : "// Add components to see the prompt here"
            }
          />
        </Suspense>
      </Box>

      {/* Usage Instructions */}
      {spuigSyntax && (
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            borderColor: "divider",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            <strong>Usage:</strong> Copy this prompt and use it in AI to
            generate components. The prompt uses indentation to represent
            component hierarchy and props for configuration.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseCopySnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseCopySnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Prompt copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SpuigPreview;
