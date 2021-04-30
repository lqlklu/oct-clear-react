import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const Auth = types
  .model("AuthModel")
  .props({
    authed: types.boolean,
    uid: types.number,
    isTry: types.boolean,
  })
  .actions((self) => {
    return {
      setAuth(uid: number) {
        self.authed = true;
        self.uid = uid;
      },
      setTry() {
        self.authed = true;
        self.isTry = true;
      },
    };
  })
  .views((self) => {
    return {};
  });

export type AuthInstance = Instance<typeof Auth>;
export type AuthSnapshotIn = SnapshotIn<typeof Auth>;
export type AuthSnapshotOut = SnapshotOut<typeof Auth>;
