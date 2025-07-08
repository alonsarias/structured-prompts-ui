import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SpuigPreviewProps {
  spuigSyntax: string;
}

const SpuigPreview: React.FC<SpuigPreviewProps> = ({ spuigSyntax }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const getFullPrompt = () => {
    return spuigSyntax
      ? `Convert the following structure into a component:\n\n${spuigSyntax}`
      : '';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullPrompt());
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([getFullPrompt()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spuig-prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCloseCopySnackbar = () => {
    setCopySuccess(false);
  };

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h6">
          Prompt Preview
        </Typography>

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

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <SyntaxHighlighter
          language="jsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            height: '100%',
            fontSize: '0.875rem',
            fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
            backgroundColor: 'transparent',
          }}
          showLineNumbers
        >
          {spuigSyntax
            ? `Convert the following structure into a component:\n\n${spuigSyntax}`
            : '// Add components to see the prompt here'
          }
        </SyntaxHighlighter>
      </Box>

      {/* Usage Instructions */}
      {spuigSyntax && (
        <Box sx={{
          p: 2,
          borderRadius: 1,
          borderColor: 'divider',
          backgroundColor: 'background.default',
        }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Usage:</strong> Copy this prompt and use it in AI to generate components.
            The prompt uses indentation to represent component hierarchy and props for configuration.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseCopySnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseCopySnackbar} severity="success" sx={{ width: '100%' }}>
          Prompt copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SpuigPreview;
