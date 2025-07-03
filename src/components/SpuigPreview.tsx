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
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SpuigPreviewProps {
  spuigSyntax: string;
}

const SpuigPreview: React.FC<SpuigPreviewProps> = ({ spuigSyntax }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spuigSyntax);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([spuigSyntax], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spuig-syntax.txt';
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
            <IconButton onClick={handleCopy} size="small">
              <CopyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download as file">
            <IconButton onClick={handleDownload} size="small">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {spuigSyntax ? (
          <SyntaxHighlighter
            language="jsx"
            style={oneLight}
            customStyle={{
              margin: 0,
              height: '100%',
              fontSize: '0.875rem',
              fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
            }}
            showLineNumbers
          >
            {spuigSyntax}
          </SyntaxHighlighter>
        ) : (
          <Box sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
          }}>
            <Typography variant="body2">
              Add components to see the prompt here
            </Typography>
          </Box>
        )}
      </Box>

      {/* Usage Instructions */}
      {spuigSyntax && (
        <Box sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'grey.50',
        }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Usage:</strong> Copy this prompt and use it in AI to generate components.
            The syntax uses indentation to represent component hierarchy and props for configuration.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseCopySnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseCopySnackbar} severity="success" sx={{ width: '100%' }}>
          Prompt copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SpuigPreview;
