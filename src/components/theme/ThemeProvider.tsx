
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';

interface ThemeContextType {
  mode: 'day' | 'night';
  toggleMode: () => void;
  isAutoMode: boolean;
  setAutoMode: (auto: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'day' | 'night'>('day');
  const [isAutoMode, setIsAutoMode] = useState(true);

  const getTimeBasedMode = useCallback((): 'day' | 'night' => {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'day' : 'night';
  }, []);

  useEffect(() => {
    if (isAutoMode) {
      const updateMode = () => {
        setMode(getTimeBasedMode());
      };

      updateMode();
      const interval = setInterval(updateMode, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAutoMode, getTimeBasedMode]);

  useEffect(() => {
    // Apply theme classes to document
    const root = document.documentElement;
    root.classList.remove('theme-day', 'theme-night');
    root.classList.add(`theme-${mode}`);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setIsAutoMode(false);
    setMode(mode === 'day' ? 'night' : 'day');
  }, [mode]);

  const setAutoMode = useCallback((auto: boolean) => {
    setIsAutoMode(auto);
    if (auto) {
      setMode(getTimeBasedMode());
    }
  }, [getTimeBasedMode]);

  const contextValue = useMemo(() => ({
    mode,
    toggleMode,
    isAutoMode,
    setAutoMode
  }), [mode, toggleMode, isAutoMode, setAutoMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
