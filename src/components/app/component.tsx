import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { ConfigProvider } from "antd";
import { Layout } from "antd";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Main } from "../main";
import { History } from "../history";
import { Signin } from "../signin";
import { Header } from "../header";
import { Footer } from "../footer";
import Cookie from "../../utils/cookie";
import { useStore } from "../../store";

import "./style.scss";

export const App: FC = observer(() => {
  const store = useStore();
  useEffect(() => {
    let uid = Cookie.get("uid");
    if (uid) {
      store.auth.setAuth(parseInt(uid));
    }
    let lang = Cookie.get("lang");
    if (lang) {
      console.log("default-lang", lang);
      store.setDefaultLang(lang);
    }
  });
  return (
    <div className="app">
      <ConfigProvider locale={store.antLocale}>
        <Router>
          <Layout>
            <Header />
            <Layout.Content className="content">
              <Switch>
                {!store.auth.authed ? (
                  <Route path={"/signin"} component={Signin} exact />
                ) : (
                  <Redirect from="/signin" to="/" />
                )}
                {store.auth.authed ? (
                  <Route path={"/"}>
                    {store.auth.isTry ? (
                      <></>
                    ) : (
                      <Route path="/history" exact>
                        <History />
                      </Route>
                    )}
                    <Route path="/" exact>
                      <Main />
                    </Route>
                  </Route>
                ) : (
                  <Redirect from="/" to="/signin" />
                )}
              </Switch>
            </Layout.Content>
            <Footer />
          </Layout>
        </Router>
      </ConfigProvider>
    </div>
  );
});
