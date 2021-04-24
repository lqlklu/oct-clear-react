import React, { FC } from "react";
import { Layout, Menu, Select } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { RootInstance } from "@src/store";
import { avaliableLang } from "../../i18n";

import "./style.scss";
import { Link } from "react-router-dom";

export interface HeaderProps {
  store: RootInstance;
}

export const Header: FC<HeaderProps> = observer(({ store }) => {
  const { t } = useTranslation();
  const changeLang = (v: string) => {
    store.setLang(v);
  };
  return (
    <Layout.Header className="header">
      <div className="header__logo">{store.info.userId}</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="header__menu"
      >
        <Menu.Item
          key="1"
          onClick={() => {
            store.view.setContent("main");
          }}
        >
          <Link to="/">{t("home")}</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            store.view.setContent("history");
          }}
        >
          <Link to="/history">{t("history")}</Link>
        </Menu.Item>
      </Menu>
      <Select
        className="header__lang-select"
        defaultValue={store.lang}
        onChange={changeLang}
        style={{ width: 120 }}
      >
        {avaliableLang.map((it) => (
          <Select.Option value={it.lang} key={it.lang}>
            {it.label}
          </Select.Option>
        ))}
      </Select>
    </Layout.Header>
  );
});
