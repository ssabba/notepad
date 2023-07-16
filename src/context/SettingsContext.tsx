import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// config
import { defaultSettings, cookiesKey, cookiesExpires } from "../../config";
// @type
import {
  ThemeDirection,
  SettingsContextProps,
  SettingsValueProps,
} from "../components/settings/type";

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Reset
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings: SettingsValueProps;
};

function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const langStorage =
    typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : "";

  useEffect(() => {
    switch (langStorage) {
      case "ja":
        onChangeDirectionByLang("ja");
        break;
      case "es":
        onChangeDirectionByLang("es");
        break;
      case "ko":
        onChangeDirectionByLang("ko");
        break;
      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langStorage]);

  // Direction

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === "rtl" ? "ltr" : "rtl",
    });
  };

  const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeDirection: (event.target as HTMLInputElement)
        .value as ThemeDirection,
    });
  };

  const onChangeDirectionByLang = (lang: string) => {
    setSettings({
      ...settings,
      themeDirection: lang === "ar" ? "rtl" : "ltr",
    });
  };

  // Reset

  const onResetSetting = () => {
    setSettings({
      themeDirection: initialState.themeDirection,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Direction
        onToggleDirection,
        onChangeDirection,
        onChangeDirectionByLang,
        // Reset
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };

// ----------------------------------------------------------------------

function useSettingCookies(
  defaultSettings: SettingsValueProps
): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] {
  const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings);

  const onChangeSetting = () => {
    Cookies.set(cookiesKey.themeDirection, settings.themeDirection, {
      expires: cookiesExpires,
    });
  };

  useEffect(() => {
    onChangeSetting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return [settings, setSettings];
}
