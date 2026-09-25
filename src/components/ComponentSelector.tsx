import React, { useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  muiComponents,
  getAllCategories,
  searchComponents,
} from "../data/muiComponents";
import type { MuiComponentDefinition } from "../types";
import { useSpuigBuilderContext } from "../contexts/SpuigBuilderContext";

interface ComponentSelectorProps {
  selectedParentId?: string | null;
  open: boolean;
  onClose: () => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  selectedParentId,
  open,
  onClose,
}) => {
  const { actions } = useSpuigBuilderContext();
  const [selectedComponent, setSelectedComponent] =
    useState<MuiComponentDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = useMemo(() => getAllCategories(), []);

  const filteredComponents = useMemo(() => {
    let components = searchQuery
      ? searchComponents(searchQuery)
      : muiComponents;

    if (selectedCategory) {
      components = components.filter(
        (comp) => comp.category === selectedCategory,
      );
    }

    return components;
  }, [searchQuery, selectedCategory]);

  const handleAddComponent = () => {
    if (selectedComponent) {
      actions.addComponent(
        selectedComponent.name,
        selectedParentId || undefined,
      );
      setSelectedComponent(null);
      setSearchQuery("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedComponent(null);
    setSearchQuery("");
    setSelectedCategory("");
    onClose();
  };

  const noMatchQuery = searchQuery.trim();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-component-title"
      scroll="paper"
      slotProps={{
        paper: {
          className: "add-component-dialog",
          sx: {
            width: 400,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "min(560px, calc(100dvh - 32px))",
            m: 2,
            backgroundColor: "var(--elevated)",
            backgroundImage: "none",
            border: "1px solid var(--seam)",
            borderRadius: "4px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <Box className="panel-header">
        <Typography id="add-component-title" variant="h6" component="h2">
          Add Component
        </Typography>
        <IconButton
          size="small"
          color="inherit"
          onClick={handleClose}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, overflow: "auto", minHeight: 0 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label="All"
                variant={selectedCategory === "" ? "filled" : "outlined"}
                color={selectedCategory === "" ? "primary" : "default"}
                onClick={() => setSelectedCategory("")}
                size="small"
              />
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  variant={
                    selectedCategory === category ? "filled" : "outlined"
                  }
                  color={selectedCategory === category ? "primary" : "default"}
                  onClick={() => setSelectedCategory(category)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>

          <Autocomplete
            className="component-search"
            options={filteredComponents}
            filterOptions={(options) => options}
            getOptionLabel={(option) => option.displayName}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={selectedComponent}
            onChange={(_, newValue) => setSelectedComponent(newValue)}
            inputValue={searchQuery}
            onInputChange={(_, newValue) => setSearchQuery(newValue)}
            slotProps={{
              popper: {
                placement: "bottom-start",
                modifiers: [
                  { name: "offset", options: { offset: [0, 8] } },
                  { name: "flip", enabled: false },
                ],
                sx: { zIndex: (theme) => theme.zIndex.modal + 1 },
              },
              listbox: { style: { maxHeight: 240 } },
            }}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: "inherit",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
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
            noOptionsText={
              noMatchQuery
                ? `No components match “${noMatchQuery}”. Names ignore spaces and punctuation, so Text Field and TextField are the same.`
                : "No components match this search."
            }
          />

          {selectedComponent && (
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {selectedComponent.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedComponent.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Category: {selectedComponent.category} • Children:{" "}
                  {selectedComponent.acceptsChildren ? "Yes" : "No"} • Text:{" "}
                  {selectedComponent.acceptsText ? "Yes" : "No"}
                </Typography>
              </Box>
            </Box>
          )}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddComponent}
            disabled={!selectedComponent}
            fullWidth
            sx={{
              borderColor: "divider",
              color: "text.primary",
              "&.Mui-disabled": {
                borderColor: "divider",
                color: "text.disabled",
              },
            }}
          >
            Add {selectedComponent?.displayName || "Component"}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ComponentSelector;
