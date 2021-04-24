import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./en-us";
import zhCN from "./zh-cn";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      "en-US": {
        translation: enUS,
      },
      "zh-CN": {
        translation: zhCN,
      },
    },
    lng: "zh-CN",
    fallbackLng: "zh-CN",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const avaliableLang: { lang: string; label: string }[] = [
  { lang: "zh-CN", label: "简体中文" },
  { lang: "en-US", label: "English" },
];
