// @mui
import { enUS, jaJP, koKR, esES, Localization } from "@mui/material/locale";
// components
import { SettingsValueProps } from "./src/components/settings/type";



// ----------------------------------------------------------------------

export const cookiesExpires = 3;

export const cookiesKey = {
  themeDirection: "themeDirection",
};

export const defaultSettings: SettingsValueProps = {
  themeDirection: "ltr",
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs: {
  label: string;
  value: string;
  systemValue: Localization;
}[] = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
  },
  {
    label: "Japanese",
    value: "ja",
    systemValue: jaJP,
  },
  {
    label: "Korean",
    value: "ko",
    systemValue: koKR,
  },
  {
    label: "Spanish",
    value: "es",
    systemValue: esES,
  },
];

export const defaultLang = allLangs[0]; // English
