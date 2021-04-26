import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const Auth = types
  .model("AuthModel")
  .props({
    authed: types.boolean,
    token: types.string,
  })
  .actions((self) => {
    return {
      setAuth(token: string) {
        self.authed = true;
        self.token = token;
      },
    };
  })
  .views((self) => {
    return {};
  });

export type AuthInstance = Instance<typeof Auth>;
export type AuthSnapshotIn = SnapshotIn<typeof Auth>;
export type AuthSnapshotOut = SnapshotOut<typeof Auth>;
