import React, { FC } from "react";
import { observer } from "mobx-react";

// import { List } from "antd";

import { ResultPair } from "../result-pair";
import { RootInstance } from "@src/store";
import "./style.scss";

export interface LogsListProps {
  store: RootInstance;
}

export const History: FC<LogsListProps> = observer(({ store }) => {
  return (
    <div className="history">
      {store.logs.sorted.map((it) => (
        <div className="item" key={it.path}>
          <ResultPair item={it} store={store} />
        </div>
      ))}
    </div>
  );
});
