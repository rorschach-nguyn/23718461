// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { COLORS, DARK_COLORS } from '@constants/theme';

export interface ThemeContextValue {
  isDark: boolean;
  colors: typeof COLORS;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const value: ThemeContextValue = {
    isDark,
    colors: isDark ? DARK_COLORS : COLORS,
    toggleTheme: () => setIsDark((prev) => !prev),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme phải được gọi bên trong <ThemeProvider>');
  }
  return ctx;
};