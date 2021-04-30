import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const MainView = types
  .model("MainViewModel")
  .props({
    result: types.boolean,
    resultPath: types.string,
  })
  .actions((self) => {
    return {
      setResult(p: string) {
        self.result = true;
        self.resultPath = p;
      },
    };
  });

export const SigninView = types
  .model("SigninViewModel")
  .props({
    isSignup: types.boolean,
  })
  .actions((self) => {
    return {
      signup() {
        self.isSignup = true;
      },
      signin() {
        self.isSignup = false;
      },
    };
  });

export const View = types
  .model("ViewModel")
  .props({

    main: MainView,
    signin: SigninView,
  })
  .actions((self) => {
    return {
      
    };
  });

export type ViewInstance = Instance<typeof View>;
export type ViewSnapshotIn = SnapshotIn<typeof View>;
export type ViewSnapshotOut = SnapshotOut<typeof View>;
