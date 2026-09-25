import { useId } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ConfirmActionDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmActionDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmActionDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      slotProps={{
        paper: {
          sx: {
            width: 400,
            maxWidth: "calc(100vw - 32px)",
            m: 2,
            p: 2,
            backgroundColor: "var(--elevated)",
            backgroundImage: "none",
            border: "1px solid var(--seam)",
            borderRadius: "4px",
          },
        },
      }}
    >
      <Typography id={titleId} variant="subtitle1" component="h2">
        {title}
      </Typography>
      <Typography
        id={descriptionId}
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {description}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="console-destructive"
          onClick={onConfirm}
          sx={{ ml: "0 !important" }}
        >
          {confirmLabel}
        </Button>
      </Box>
    </Dialog>
  );
}
