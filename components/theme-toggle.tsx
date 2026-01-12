"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
    isDarkMode: mounted && theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light");
    },
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className="h-9 w-9"
      onClick={toggleSwitchTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

