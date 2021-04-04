import React, { FC } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";

import { RootInstance } from "@src/store";
import "./style.css";

export interface HeaderProps {
  store: RootInstance;
}

export const Header: FC<HeaderProps> = observer(({ store }) => {
  return (
    <Layout.Header className="header">
      User Id: {store.info.userId}
    </Layout.Header>
  );
});
