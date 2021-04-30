import { createContext, useContext } from "react";
import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

import { Info } from "./info";
import { Logs } from "./logs";
import { View } from "./view";
import { Auth } from "./auth";
import i18n from "../i18n";
import Cookie from "../utils/cookie";

export const Root = types
  .model("RootModel")
  .props({
    logs: Logs,
    info: Info,
    view: View,
    lang: types.string,
    defaultLang: types.string,
    auth: Auth,
  })
  .actions((self) => {
    return {
      setLang(l: string) {
        self.lang = l;
        i18n.changeLanguage(l);
        Cookie.set("lang", l);
      },
      setDefaultLang(l: string) {
        self.defaultLang = l;
        this.setLang(l);
      },
    };
  })
  .views((self) => {
    return {
      get antLocale() {
        if (self.lang === "zh-CN") {
          return zhCN;
        } else if (self.lang === "en-US") {
          return enUS;
        } else {
          return zhCN;
        }
      },
    };
  });

export type RootInstance = Instance<typeof Root>;
export type RootSnapshotIn = SnapshotIn<typeof Root>;
export type RootSnapshotOut = SnapshotOut<typeof Root>;

export const rootStore = Root.create({
  logs: {
    items: [],
  },
  info: {
    server: "http://localhost:8000/",
  },
  view: {
    main: {
      result: false,
      resultPath: "",
    },
    signin: {
      isSignup: false,
    },
  },
  lang: "zh-CN",
  defaultLang: "zh-CN",
  auth: {
    authed: false,
    uid: 0,
    isTry: false,
  },
});

export const StoreContext = createContext(rootStore);

export const useStore = () => {
  return useContext(StoreContext);
};

export * from "./auth";
export * from "./info";
export * from "./logs";
export * from "./view";
