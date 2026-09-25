import { createTheme } from "@mui/material/styles";

const keyword = "#79C0FF";
const ground = "#0D1117";
const panel = "#151A22";
const elevated = "#1B212B";
const seam = "#262C36";
const muted = "#8B949E";
const text = "#E6EDF3";
const string = "#56D364";
const warning = "#E3B341";
const destructive = "#F85149";

const sans = '"Lexend Variable", "Lexend", sans-serif';

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: keyword,
      light: "#9DCEFF",
      dark: "#58A6FF",
      contrastText: ground,
    },
    secondary: {
      main: keyword,
      light: "#9DCEFF",
      dark: "#58A6FF",
      contrastText: ground,
    },
    error: {
      main: destructive,
      light: "#FF7B72",
      dark: "#DA3633",
      contrastText: text,
    },
    warning: {
      main: warning,
      light: "#F0C14D",
      dark: "#9E6A03",
      contrastText: ground,
    },
    info: {
      main: keyword,
      light: "#9DCEFF",
      dark: "#58A6FF",
      contrastText: ground,
    },
    success: {
      main: string,
      light: "#7EE787",
      dark: "#2EA043",
      contrastText: ground,
    },
    background: {
      default: ground,
      paper: panel,
    },
    text: {
      primary: text,
      secondary: muted,
      disabled: "rgba(139, 148, 158, 0.45)",
    },
    divider: seam,
    action: {
      active: keyword,
      hover: "rgba(121, 192, 255, 0.08)",
      selected: "rgba(121, 192, 255, 0.14)",
      disabled: "rgba(230, 237, 243, 0.28)",
      disabledBackground: "rgba(230, 237, 243, 0.06)",
      focus: "rgba(121, 192, 255, 0.16)",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: sans,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 560,
    fontWeightBold: 650,
    allVariants: {
      fontFeatureSettings: '"tnum"',
    },
    button: {
      fontSize: "0.8125rem",
      fontWeight: 560,
      letterSpacing: "0.01em",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: ground,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: panel,
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          textTransform: "none",
          fontWeight: 560,
          "&:hover": { boxShadow: "none" },
        },
        contained: {
          backgroundColor: keyword,
          color: ground,
          "&:hover": { backgroundColor: "#9DCEFF" },
          "&.Mui-disabled": {
            backgroundColor: "rgba(121, 192, 255, 0.18)",
            color: "rgba(13, 17, 23, 0.55)",
          },
        },
        outlined: {
          borderColor: seam,
          color: text,
          "&:hover": {
            borderColor: keyword,
            backgroundColor: "rgba(121, 192, 255, 0.08)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          color: muted,
          "&:hover": {
            backgroundColor: "rgba(121, 192, 255, 0.08)",
            color: text,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: seam,
          color: muted,
          textTransform: "none",
          "&.Mui-selected": {
            color: keyword,
            borderColor: keyword,
            backgroundColor: "rgba(121, 192, 255, 0.1)",
            "&:hover": { backgroundColor: "rgba(121, 192, 255, 0.16)" },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontVariantNumeric: "tabular-nums",
        },
        outlined: {
          borderColor: seam,
        },
        filled: {
          backgroundColor: "rgba(121, 192, 255, 0.16)",
          color: keyword,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: ground,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: seam },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: muted },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: keyword },
        },
        input: {
          fontVariantNumeric: "tabular-nums",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: keyword },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: elevated,
          border: `1px solid ${seam}`,
          borderRadius: 4,
          boxShadow: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: elevated,
          border: `1px solid ${seam}`,
          borderRadius: 4,
          boxShadow: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(121, 192, 255, 0.14)",
            "&:hover": { backgroundColor: "rgba(121, 192, 255, 0.2)" },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: elevated,
          border: `1px solid ${seam}`,
          borderRadius: 4,
          boxShadow: "none",
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: "rgba(121, 192, 255, 0.14)",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: elevated,
          backgroundImage: "none",
          borderLeft: `1px solid ${seam}`,
          boxShadow: "none",
          transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1) !important",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: elevated,
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: `1px solid ${seam}`,
          backgroundColor: elevated,
          alignItems: "center",
        },
        standardError: { color: destructive },
        standardWarning: { color: warning },
        standardSuccess: { color: string },
        standardInfo: { color: keyword },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: elevated,
          color: text,
          border: `1px solid ${seam}`,
          borderRadius: 4,
          fontFamily: sans,
          fontSize: 12,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: keyword,
            "& + .MuiSwitch-track": {
              backgroundColor: keyword,
              opacity: 0.45,
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: seam },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
          "&:before": { display: "none" },
        },
      },
    },
  },
});
