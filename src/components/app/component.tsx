import React, { FC, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Layout } from "antd";
import { observer } from "mobx-react";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LogItemInstance } from "@store/logs";
import { RootInstance } from "@src/store";
import { Main } from "../main";
import { Header } from "../header";
import { History } from "../history/component";
import { Footer } from "../footer";

import "./style.scss";

export interface AppProps {
  store: RootInstance;
}

export interface FetchallResponse {
  status: string;
  payload: LogItemInstance[];
}

export const App: FC<AppProps> = observer(({ store }) => {
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
            <Header store={store} />
            <Layout.Content className="content">
              <Switch>
                <Route path="/history">
                  <History store={store} />
                </Route>
                <Route path="/">
                  <Main store={store} />
                </Route>
              </Switch>
            </Layout.Content>
            <Footer store={store} />
          </Layout>
        </Router>
      </ConfigProvider>
    </div>
  );
});
