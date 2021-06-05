import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import Cookie from "../utils/cookie";

export const Auth = types
  .model("AuthModel")
  .props({
    authed: types.boolean,
    uid: types.number,
    isTry: types.boolean,
    verifyUid: types.number,
    verifyEmail: types.string,
  })
  .actions((self) => {
    return {
      setAuth(uid: number) {
        self.authed = true;
        self.uid = uid;
      },
      setVerify( email: string) {
        self.verifyEmail = email;
      },
      setTry() {
        self.authed = true;
        self.isTry = true;
      },
      signup() {},
      signin() {},
      signout() {},
      logout() {
        self.authed = false;
        Cookie.del("uid");
      },
    };
  })
  .views((self) => {
    return {};
  });

export type AuthInstance = Instance<typeof Auth>;
export type AuthSnapshotIn = SnapshotIn<typeof Auth>;
export type AuthSnapshotOut = SnapshotOut<typeof Auth>;
