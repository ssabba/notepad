// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";
export type ThemeContrast = "default" | "bold";
export type ThemeLayout = "vertical" | "horizontal";
export type ThemeColorPresets =
  | "default"
  | "green"
  | "blue"
  | "yellow"
  | "red"
  | "black"
  | "white";
export type ThemeStretch = boolean;

export type SettingsValueProps = {
  themeDirection: ThemeDirection;
};

export type SettingsContextProps = {
  themeDirection: ThemeDirection;
  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Reset
  onResetSetting: VoidFunction;
};
