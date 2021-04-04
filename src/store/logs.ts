import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const LogItem = types.model("LogsItemModel").props({
  name: types.string,
  user_id: types.number,
  path: types.string,
  time: types.number,
});

export type LogItemInstance = Instance<typeof LogItem>;
export type LogItemSnapshotIn = SnapshotIn<typeof LogItem>;
export type LogItemSnapshotOut = SnapshotOut<typeof LogItem>;

export const Logs = types
  .model("LogsModel")
  .props({
    items: types.array(LogItem),
  })
  .actions((self) => {
    return {
      init(its: LogItemInstance[]) {
        self.items.clear();
        self.items.push(...its);
      },
      add(it: LogItemInstance) {
        self.items.push(it);
      },
      remove(it: LogItemInstance) {
        self.items.remove(it);
        // self.items.filter((i) => i.path === it.path);
      },
    };
  })
  .views((self) => {
    return {
      get sorted() {
        return self.items.slice().sort((a, b) => {
          return b.time - a.time;
        });
      },
    };
  });

export type LogsInstance = Instance<typeof Logs>;
export type LogsSnapshotIn = SnapshotIn<typeof Logs>;
export type LogsSnapshotOut = SnapshotOut<typeof Logs>;
