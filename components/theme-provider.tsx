"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      themes={[
        "light",
        "dark",
        "light-high-contrast",
        "dark-high-contrast",
        "light-soft",
        "light-neutral",
        "light-cool",
        "dark-deep",
        "dark-warm",
        "dark-cool",
      ]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
