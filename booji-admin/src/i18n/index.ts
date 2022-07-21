import i18n from "i18next";
import cn from "./cn.json";
import en from "./en.json";
import { initReactI18next } from "react-i18next";
import { lang } from "@/config/constant";

export const resources = {
  cn: {
    translation: cn,
  },
  en: {
    translation: en,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: lang,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
