import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getMuiComponentByName } from "../data/muiComponents";
import { useSpuigBuilderContext } from "../contexts/SpuigBuilderContext";
import { useTreeNodeContext } from "../contexts/TreeNodeContext";
import type { MuiPropDefinition, PropValue } from "../types";

interface PropertyEditorContentProps {
  onClose: () => void;
}

const ADVANCED_NAMES = new Set([
  "sx",
  "component",
  "components",
  "componentsProps",
  "slots",
  "slotProps",
  "ref",
]);

function isAdvancedProp(prop: MuiPropDefinition): boolean {
  if (prop.required) return false;
  const { name, type } = prop;
  if (ADVANCED_NAMES.has(name)) return true;
  if (/Ref$/.test(name)) return true;
  if (/Props$/.test(name) || /Component$/.test(name)) return true;
  if (/icon/i.test(name)) return true;
  if (/^loading/i.test(name)) return true;
  if (/^disable(?!d$)/.test(name)) return true;
  if (type === "object" || type === "function") return true;
  return false;
}

function hasPropValue(value: PropValue): boolean {
  return value !== undefined && value !== null && value !== "";
}

const PropertyEditorContent: React.FC<PropertyEditorContentProps> = ({
  onClose,
}) => {
  const {
    state: { component },
  } = useTreeNodeContext();
  if (!component) {
    return (
      <Box
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Select a component to edit its properties
        </Typography>
      </Box>
    );
  }
  if (component.isRoot) return <RootPropertyInfo onClose={onClose} />;
  return <ComponentPropertyEditor onClose={onClose} />;
};

function RootPropertyInfo({ onClose }: { onClose: () => void }) {
  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <EditorHeader title="Root" onClose={onClose} />
      <Typography variant="body2" color="text.secondary">
        The Root acts as the container for your entire component structure. It
        doesn&apos;t appear in the generated prompt and only supports adding
        child components.
      </Typography>
      <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          You cannot edit properties of the Root. Select a child component to
          edit its properties.
        </Typography>
      </Box>
    </Box>
  );
}

function EditorHeader({
  title,
  description,
  onClose,
}: {
  title: string;
  description?: string;
  onClose: () => void;
}) {
  return (
    <Box sx={{ mb: description ? 1 : 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <IconButton size="small" color="inherit" onClick={onClose} aria-label="Close properties">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
}

interface ComponentPropertyEditorProps {
  onClose: () => void;
}

const ComponentPropertyEditor: React.FC<ComponentPropertyEditorProps> = ({
  onClose,
}) => {
  const {
    state: { component },
  } = useTreeNodeContext();
  const {
    state: { validationErrors },
    actions: { updateComponent },
  } = useSpuigBuilderContext();
  const muiComponent = getMuiComponentByName(component.componentName);
  const componentErrors: typeof validationErrors = [];
  const propNamesWithErrors = new Set<string>();
  for (const error of validationErrors) {
    if (error.componentId === component.id) {
      componentErrors.push(error);
      if (error.type === "invalid-prop-type") {
        propNamesWithErrors.add(error.id.replace(/^.*-invalid-/, ""));
      }
    }
  }

  const handlePropChange = (
    propName: string,
    value: string | number | boolean | object | null
  ) => {
    const newProps = { ...component.props };

    if (value === "" || value === null || value === undefined) {
      delete newProps[propName];
    } else {
      newProps[propName] = value;
    }

    updateComponent(component.id, { props: newProps });
  };

  const handleTextContentChange = (textContent: string) => {
    updateComponent(component.id, { textContent });
  };

  const renderPropEditor = (propDef: MuiPropDefinition) => {
    const currentValue = component.props[propDef.name] ?? "";
    const hasError = propNamesWithErrors.has(propDef.name);
    const description =
      propDef.name === "children"
        ? muiComponent?.acceptsText
          ? "Text Content is the prompt text node. This children prop is separate and usually unnecessary."
          : "Child components are added from the tree. This field writes a children prop into the prompt."
        : propDef.description;

    switch (propDef.type) {
      case "boolean":
        return (
          <FormControlLabel
            key={propDef.name}
            control={
              <Switch
                checked={Boolean(currentValue)}
                onChange={(e) =>
                  handlePropChange(propDef.name, e.target.checked)
                }
                size="small"
              />
            }
            label={
              <Box>
                <Typography variant="body2">
                  {propDef.name}
                  {propDef.required && (
                    <span style={{ color: "red" }}> *</span>
                  )}
                </Typography>
                {description && (
                  <Typography variant="caption" color="text.secondary" component="p">
                    {description}
                  </Typography>
                )}
              </Box>
            }
          />
        );

      case "enum":
        return (
          <FormControl key={propDef.name} fullWidth size="small" error={hasError}>
            <InputLabel>
              {propDef.name}
              {propDef.required && <span style={{ color: "red" }}> *</span>}
            </InputLabel>
            <Select
              value={currentValue}
              label={`${propDef.name}${propDef.required ? " *" : ""}`}
              onChange={(e) => handlePropChange(propDef.name, e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {propDef.enumValues?.map((enumValue: string) => (
                <MenuItem key={enumValue} value={enumValue}>
                  {enumValue}
                </MenuItem>
              ))}
            </Select>
            {description && (
              <Typography
                variant="caption"
                color="text.secondary"
                component="p"
                sx={{ mt: 0.5 }}
              >
                {description}
              </Typography>
            )}
          </FormControl>
        );

      case "number":
        return (
          <TextField
            key={propDef.name}
            label={`${propDef.name}${propDef.required ? " *" : ""}`}
            type="number"
            value={currentValue}
            onChange={(e) => {
              const numValue =
                e.target.value === "" ? null : Number(e.target.value);
              handlePropChange(propDef.name, numValue);
            }}
            fullWidth
            size="small"
            error={hasError}
            helperText={description}
          />
        );

      default:
        return (
          <TextField
            key={propDef.name}
            label={`${propDef.name}${propDef.required ? " *" : ""}`}
            value={currentValue as string | number}
            onChange={(e) => handlePropChange(propDef.name, e.target.value)}
            fullWidth
            size="small"
            error={hasError}
            helperText={description}
            multiline={propDef.type === "object"}
            rows={propDef.type === "object" ? 3 : 1}
          />
        );
    }
  };

  const basicProps: MuiPropDefinition[] = [];
  const advancedProps: MuiPropDefinition[] = [];
  for (const propDef of muiComponent?.props ?? []) {
    const redundantChildren =
      propDef.name === "children" &&
      Boolean(muiComponent?.acceptsText) &&
      !hasPropValue(component.props.children);
    if (redundantChildren) continue;
    const parkChildren = propDef.name === "children" && !propDef.required;
    if (parkChildren || isAdvancedProp(propDef)) {
      advancedProps.push(propDef);
    } else {
      basicProps.push(propDef);
    }
  }

  const advancedSetCount = advancedProps.filter((propDef) =>
    hasPropValue(component.props[propDef.name])
  ).length;
  const advancedHasError = advancedProps.some((propDef) =>
    propNamesWithErrors.has(propDef.name)
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <EditorHeader
          title={`${component.componentName} properties`}
          description={muiComponent?.description}
          onClose={onClose}
        />
      </Box>

      {componentErrors.length > 0 && (
        <Box sx={{ px: 2, pt: 2 }}>
          {componentErrors.map((error) => (
            <Alert key={error.id} severity={error.severity} sx={{ mb: 1 }}>
              {error.message}
            </Alert>
          ))}
        </Box>
      )}

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, minWidth: 0 }}>
        <Stack spacing={2.5}>
          {muiComponent?.acceptsText && (
            <Box>
              <Typography variant="subtitle2" component="h3" gutterBottom>
                Content
              </Typography>
              <TextField
                label="Text Content"
                value={component.textContent || ""}
                onChange={(e) => handleTextContentChange(e.target.value)}
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Enter the text this component shows"
                helperText="This is the component’s text node in the prompt, not a child component."
              />
            </Box>
          )}

          {basicProps.length > 0 && (
            <Box>
              <Typography variant="subtitle2" component="h3" gutterBottom>
                Basic
              </Typography>
              <Stack spacing={2}>{basicProps.map(renderPropEditor)}</Stack>
            </Box>
          )}

          {advancedProps.length > 0 && (
            <Accordion
              disableGutters
              elevation={0}
              defaultExpanded={advancedHasError}
              sx={{
                background: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
                border: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0, minHeight: 40 }}
              >
                <Typography variant="subtitle2" component="h3">
                  Advanced
                  {advancedSetCount > 0 ? ` (${advancedSetCount} set)` : ""}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Stack spacing={2}>{advancedProps.map(renderPropEditor)}</Stack>
              </AccordionDetails>
            </Accordion>
          )}

          <Divider />
          <Box>
            <Typography variant="subtitle2" component="h3" gutterBottom>
              Component info
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Category: {muiComponent?.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accepts children: {muiComponent?.acceptsChildren ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accepts text: {muiComponent?.acceptsText ? "Yes" : "No"}
              </Typography>
              {muiComponent?.validParents && (
                <Typography variant="body2" color="text.secondary">
                  Valid parents: {muiComponent.validParents.join(", ")}
                </Typography>
              )}
              {muiComponent?.validChildren && (
                <Typography variant="body2" color="text.secondary">
                  Valid children: {muiComponent.validChildren.join(", ")}
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

interface PropertyEditorProps {
  open: boolean;
  onClose: () => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const content = <PropertyEditorContent onClose={onClose} />;

  if (isSmallScreen) {
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { display: "flex", flexDirection: "column" },
          },
        }}
      >
        {content}
      </Dialog>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 400,
            maxWidth: "100%",
          },
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default PropertyEditor;
