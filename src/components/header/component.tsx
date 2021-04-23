import React, { FC } from "react";
import { Layout, Menu } from "antd";
import { observer } from "mobx-react";

import { RootInstance } from "@src/store";

import "./style.css";

export interface HeaderProps {
  store: RootInstance;
}

export const Header: FC<HeaderProps> = observer(({ store }) => {
  return (
    <Layout.Header className="header">
      <div className="header__logo">{store.info.userId}</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          onClick={() => {
            store.view.setContent("main");
          }}
        >
          主页
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            store.view.setContent("history");
          }}
        >
          历史
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
});
