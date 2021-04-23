import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { Info } from "./info";
import { Logs } from "./logs";
import { View } from "./view";
export const Root = types.model("RootModel").props({
  logs: Logs,
  info: Info,
  view: View,
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
});
