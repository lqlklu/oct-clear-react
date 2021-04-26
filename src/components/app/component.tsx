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
import axios, { AxiosResponse } from "axios";

import { Main } from "../main";
import { History } from "../history";
import { Signin } from "../signin";
import { Header } from "../header";
import { Footer } from "../footer";

import Cookie from "../../utils/cookie";
import { useStore, LogItemInstance } from "../../store";

import "./style.scss";

export interface FetchallResponse {
  status: string;
  payload: LogItemInstance[];
}

export const App: FC = observer(() => {
  const store = useStore();
  useEffect(() => {
    let username = Cookie.get("username");
    if (username) {
      store.auth.setAuth(username);
    }
  });
  useEffect(() => {
    axios
      .get(store.info.server + "fetch_all/" + store.info.userId)
      .then((data: AxiosResponse<FetchallResponse>) => {
        return data.data;
      })
      .then((response) => {
        if (response.status === "ok") {
          store.logs.init(response.payload);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.info.server, store.info.userId]);
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
                    <Route path="/history" exact>
                      <History store={store} />
                    </Route>
                    <Route path="/" exact>
                      <Main store={store} />
                    </Route>
                  </Route>
                ) : (
                  <Redirect from="/" to="/signin" />
                )}
              </Switch>
            </Layout.Content>
            <Footer store={store} />
          </Layout>
        </Router>
      </ConfigProvider>
    </div>
  );
});
