import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { Info } from "./info";
import { Logs } from "./logs";

export const Root = types.model("RootModel").props({
  logs: Logs,
  info: Info,
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
});
