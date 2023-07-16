import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// config
import { defaultLang } from "../config";
//
import enLocales from "./en";
import esLocales from "./es";
import jaLocales from "./ja";
import koLocales from "./ko";

// ----------------------------------------------------------------------

let lng = defaultLang.value;

if (typeof window !== "undefined") {
  lng = localStorage.getItem("i18nextLng") || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      es: { translations: esLocales },
      ja: { translations: jaLocales },
      ko: { translations: koLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
