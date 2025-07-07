import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      50: "#f5f1fd",
      100: "#ebe3fb",
      200: "#d8c7f7",
      300: "#c1a1f2",
      400: "#a471eb",
      500: "#B468E6", // Main primary color
      600: "#9b4de0",
      700: "#8338d4",
      800: "#6d2eb2",
      900: "#5a2892",
      main: "#B468E6",
      light: "#c1a1f2",
      dark: "#8338d4",
      contrastText: "#ffffff",
    },
    secondary: {
      50: "#f0fcff",
      100: "#e0f8ff",
      200: "#baf1ff",
      300: "#7de7ff",
      400: "#38d9ff",
      500: "#6ECEFA", // Main secondary color
      600: "#0ea5e9",
      700: "#0284c7",
      800: "#0369a1",
      900: "#0c4a6e",
      main: "#6ECEFA",
      light: "#7de7ff",
      dark: "#0284c7",
      contrastText: "#0c1821",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      main: "#ef4444",
      light: "#f87171",
      dark: "#b91c1c",
      contrastText: "#ffffff",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#b45309",
      contrastText: "#1f2937",
    },
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      main: "#22c55e",
      light: "#4ade80",
      dark: "#15803d",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0a0a1a",
      paper: "#151528",
    },
    text: {
      primary: "#e8e8f3",
      secondary: "#a8a8c8",
      disabled: "#6d6d8d",
    },
    divider: "rgba(180, 104, 230, 0.12)",
    action: {
      active: "#B468E6",
      hover: "rgba(180, 104, 230, 0.08)",
      selected: "rgba(180, 104, 230, 0.12)",
      disabled: "rgba(232, 232, 243, 0.26)",
      disabledBackground: "rgba(232, 232, 243, 0.12)",
      focus: "rgba(180, 104, 230, 0.12)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h4: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "0em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0em",
      background: "linear-gradient(135deg, #6ECEFA 0%, #B468E6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
      color: "#a8a8c8",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
      color: "#a8a8c8",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.01em",
      color: "#e8e8f3",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.01em",
      color: "#e8e8f3",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.02em",
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.03em",
      color: "#6d6d8d",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#6d6d8d",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            radial-gradient(ellipse at top, rgba(110, 206, 250, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(180, 104, 230, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(110, 206, 250, 0.02) 0%, rgba(180, 104, 230, 0.02) 100%),
            #0a0a1a
          `,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          // Fallback for browsers without backdrop-filter support
          "@supports not (backdrop-filter: blur(20px))": {
            background: "#0a0a1a",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: `
            linear-gradient(135deg,
              rgba(110, 206, 250, 0.05) 0%,
              rgba(180, 104, 230, 0.03) 50%,
              rgba(21, 21, 40, 0.8) 100%
            )
          `,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(180, 104, 230, 0.1)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          // Fallback for browsers without backdrop-filter support
          "@supports not (backdrop-filter: blur(16px))": {
            background: "rgba(21, 21, 40, 0.95)",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#151528",
          border: "1px solid rgba(180, 104, 230, 0.2)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#e8e8f3",
          "&:hover": {
            backgroundColor: "rgba(180, 104, 230, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(180, 104, 230, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(180, 104, 230, 0.2)",
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#151528",
          border: "1px solid rgba(180, 104, 230, 0.2)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        },
        option: {
          backgroundColor: "transparent",
          color: "#e8e8f3",
          "&:hover": {
            backgroundColor: "rgba(180, 104, 230, 0.1)",
          },
          "&[aria-selected='true']": {
            backgroundColor: "rgba(180, 104, 230, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(180, 104, 230, 0.2)",
            },
          },
        },
      },
    },
  },
});

export default theme;
