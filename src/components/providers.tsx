"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { type ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { theme } from "@/theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
