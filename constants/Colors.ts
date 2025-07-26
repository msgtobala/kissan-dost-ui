/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#275d63";
const tintColorDark = "#effbf4";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#275d63",
    secondary: "#e58948",
    accent: "#effbf4",
    gradientStart: "#effbf4",
    gradientEnd: "#d7f2e1",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#f44336",
    surface: "#f8f9fa",
    border: "#e1e8ed",
    placeholder: "#8e9196",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#effbf4",
    secondary: "#e58948",
    accent: "#275d63",
    gradientStart: "#275d63",
    gradientEnd: "#1a4147",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#f44336",
    surface: "#1e1e1e",
    border: "#2a2a2a",
    placeholder: "#6b7280",
  },
};
