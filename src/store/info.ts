import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const Info = types
  .model("InfoModel")
  .props({
    server: types.string,
  })
  .actions((self) => {
    return {
      setServer(server: string) {
        self.server = server;
      },
    };
  });

export type InfoInstance = Instance<typeof Info>;
export type InfoSnapshotIn = SnapshotIn<typeof Info>;
export type InfoSnapshotOut = SnapshotOut<typeof Info>;
