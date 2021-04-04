import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const Info = types
  .model("InfoModel")
  .props({
    userId: types.number,
    server: types.string,
  })
  .actions((self) => {
    return {
      setUserId(uid: number) {
        self.userId = uid;
      },
      setServer(server: string) {
        self.server = server;
      },
    };
  });

export type InfoInstance = Instance<typeof Info>;
export type InfoSnapshotIn = SnapshotIn<typeof Info>;
export type InfoSnapshotOut = SnapshotOut<typeof Info>;
