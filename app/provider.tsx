"use client";

import { ReactElement } from "react";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";
import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Quicksand",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ThemeProvider theme={darkTheme}>
          <AuthContext.Provider value={authenticated}>
            {children}
          </AuthContext.Provider>
        </ThemeProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
