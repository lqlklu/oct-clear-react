import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

import { Info } from "./info";
import { Logs } from "./logs";
import { View } from "./view";
import i18n from "../i18n";

export const Root = types
  .model("RootModel")
  .props({
    logs: Logs,
    info: Info,
    view: View,
    lang: types.string,
  })
  .actions((self) => {
    return {
      setLang(l: string) {
        self.lang = l;
        i18n.changeLanguage(l);
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
    userId: 6479,
  },
  view: {
    content: "main",
    main: {
      result: false,
      resultPath: "",
    },
  },
  lang: "zh-CN",
});
