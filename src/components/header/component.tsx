import React, { FC } from "react";
import { Layout, Menu, Select } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useStore } from "../../store";
import { avaliableLang } from "../../i18n";
import Cookie from "../../utils/cookie";

import "./style.scss";

const Sub: FC = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <>
      {store.auth.isTry ? <></> : <div className="logo">{store.auth.uid}</div>}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="menu"
      >
        <Menu.Item key="1" onClick={() => {}}>
          <Link to="/">{t("home")}</Link>
        </Menu.Item>
        {store.auth.isTry ? (
          <></>
        ) : (
          <Menu.Item key="2" onClick={() => {}}>
            <Link to="/history">{t("history")}</Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
});

export const Header: FC = observer(() => {
  const store = useStore();
  const changeLang = (v: string) => {
    store.setLang(v);
  };
  const defaultLang = Cookie.get("lang") || avaliableLang[0].lang;
  return (
    <Layout.Header className="header">
      {store.auth.authed ? <Sub /> : <></>}
      <Select
        className="lang-select"
        defaultValue={defaultLang}
        onChange={changeLang}
        style={{ width: 100 }}
        size="small"
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
