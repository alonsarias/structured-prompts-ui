import React, { useRef, useState, lazy, Suspense } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";
import { useSpuigBuilderContext } from "../contexts/SpuigBuilderContext";

const CodeHighlighter = lazy(() => import("./CodeHighlighter"));

const codeHighlighterFallback = (
  <Box
    sx={{ p: 2, fontFamily: "monospace", fontSize: "0.875rem", opacity: 0.5 }}
  >
    Loading preview...
  </Box>
);

const COPIED_MS = 2000;
const ERROR_MS = 4000;

const SpuigPreview: React.FC = () => {
  const { state } = useSpuigBuilderContext();
  const spuigSyntax = state.generatedSpuig;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [downloadState, setDownloadState] = useState<
    "idle" | "downloaded" | "error"
  >("idle");
  const [wrapLines, setWrapLines] = useState(true);
  const copyTimer = useRef<number | null>(null);
  const downloadTimer = useRef<number | null>(null);
  const hasPrompt = Boolean(spuigSyntax);

  const getFullPrompt = () => {
    return spuigSyntax
      ? `Convert the following structure into a component:\n\n${spuigSyntax}`
      : "";
  };

  const flashCopy = (next: "copied" | "error") => {
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    setCopyState(next);
    copyTimer.current = window.setTimeout(
      () => setCopyState("idle"),
      next === "copied" ? COPIED_MS : ERROR_MS,
    );
  };

  const flashDownload = (next: "downloaded" | "error") => {
    if (downloadTimer.current) window.clearTimeout(downloadTimer.current);
    setDownloadState(next);
    downloadTimer.current = window.setTimeout(
      () => setDownloadState("idle"),
      next === "downloaded" ? COPIED_MS : ERROR_MS,
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullPrompt());
      flashCopy("copied");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      flashCopy("error");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([getFullPrompt()], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spuig-prompt.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      flashDownload("downloaded");
    } catch (err) {
      console.error("Failed to download prompt:", err);
      flashDownload("error");
    }
  };

  const copyLabel =
    copyState === "copied"
      ? "Copied"
      : copyState === "error"
        ? "Couldn't copy to the clipboard"
        : "Copy to clipboard";

  const downloadLabel =
    downloadState === "downloaded"
      ? "Downloaded"
      : downloadState === "error"
        ? "Couldn't download the prompt"
        : "Download as file";

  const statusMessage =
    copyState === "copied"
      ? "Copied"
      : copyState === "error"
        ? "Couldn't copy the prompt. Select the prompt and copy it manually."
        : downloadState === "downloaded"
          ? "Downloaded"
          : downloadState === "error"
            ? "Couldn't download the prompt."
            : "";

  return (
    <Paper elevation={0} className="preview-shell">
      <Box className="panel-header">
        <Typography variant="h6">Prompt Preview</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {hasPrompt && (
            <Tooltip
              title={
                wrapLines
                  ? "Lines fit the panel width"
                  : "Lines keep their original width"
              }
            >
              <ToggleButton
                value="wrap"
                selected={wrapLines}
                onChange={() => setWrapLines((prev) => !prev)}
                size="small"
                aria-label="Fit width"
                sx={{
                  height: 34,
                  px: 1.25,
                  py: 0,
                  textTransform: "none",
                  lineHeight: 1,
                }}
              >
                Fit width
              </ToggleButton>
            </Tooltip>
          )}

          <Tooltip
            title={copyLabel}
            open={copyState !== "idle" ? true : undefined}
          >
            <span>
              <IconButton
                onClick={handleCopy}
                size="small"
                disabled={!hasPrompt}
                aria-label={copyLabel}
                sx={{
                  color: "background.default",
                  backgroundColor: "primary.main",
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: "primary.light" },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(121, 192, 255, 0.18)",
                    color: "rgba(13, 17, 23, 0.45)",
                  },
                }}
              >
                {copyState === "copied" ? <CheckIcon /> : <CopyIcon />}
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip
            title={downloadLabel}
            open={downloadState !== "idle" ? true : undefined}
          >
            <span>
              <IconButton
                onClick={handleDownload}
                size="small"
                color="inherit"
                disabled={!hasPrompt}
                aria-label={downloadLabel}
              >
                {downloadState === "downloaded" ? (
                  <CheckIcon />
                ) : (
                  <DownloadIcon />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Box>

      <Box
        component="span"
        role="status"
        aria-live="polite"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {statusMessage}
      </Box>

      {copyState === "error" && (
        <Alert
          severity="error"
          onClose={() => setCopyState("idle")}
          sx={{ mx: 2, mt: 1 }}
        >
          Couldn't copy the prompt. Select the prompt and copy it manually.
        </Alert>
      )}
      {downloadState === "error" && (
        <Alert
          severity="error"
          onClose={() => setDownloadState("idle")}
          sx={{ mx: 2, mt: 1 }}
        >
          Couldn't download the prompt.
        </Alert>
      )}

      <Box className="preview-scroll">
        {hasPrompt ? (
          <Suspense fallback={codeHighlighterFallback}>
            <Box className="prompt-sheet" sx={{ minHeight: "100%" }}>
              <CodeHighlighter
                code={`Convert the following structure into a component:\n\n${spuigSyntax}`}
                wrap={wrapLines}
              />
            </Box>
          </Suspense>
        ) : (
          <Box sx={{ p: 3, maxWidth: "42ch" }}>
            <Typography variant="body2" color="text.secondary">
              The structured prompt appears here after you add a component.
            </Typography>
          </Box>
        )}
      </Box>

      {spuigSyntax && (
        <Box className="preview-usage">
          <Typography variant="caption" color="text.secondary">
            <strong>Usage:</strong> Copy this prompt and use it in AI to
            generate components. The prompt uses indentation to represent
            component hierarchy and props for configuration.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SpuigPreview;
