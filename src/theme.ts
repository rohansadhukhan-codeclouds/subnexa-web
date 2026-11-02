"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: { main: "#f4f4f5" },
    secondary: { main: "#a1a1aa" },
    background: { default: "#09090b", paper: "#18181b" },
    text: { primary: "#fafafa", secondary: "#a1a1aa" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    button: { fontWeight: 560 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
          paddingInline: 18,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
    },
  },
});
