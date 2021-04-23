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

export const ContentType = types.enumeration(["main", "history"]);
export type ContentTypeInstance = Instance<typeof ContentType>;

export const View = types
  .model("ViewModel")
  .props({ content: ContentType, main: MainView })
  .actions((self) => {
    return {
      setContent(c: ContentTypeInstance) {
        self.content = c;
      },
    };
  });

export type ViewInstance = Instance<typeof View>;
export type ViewSnapshotIn = SnapshotIn<typeof View>;
export type ViewSnapshotOut = SnapshotOut<typeof View>;
