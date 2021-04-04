import React, { FC } from "react";
import { observer } from "mobx-react";
import { List } from "antd";
import { ResultPair } from "../result-pair";
import { RootInstance } from "@src/store";
import "./style.css";

export interface LogsListProps {
  store: RootInstance;
}

export const LogsList: FC<LogsListProps> = observer(({ store }) => {
  return (
    <div className="history-list">
      <List
        itemLayout="horizontal"
        dataSource={store.logs.sorted}
        renderItem={(it) => (
          <List.Item key={it.path}>
            <ResultPair item={it} store={store} />
          </List.Item>
        )}
      />
    </div>
  );
});
