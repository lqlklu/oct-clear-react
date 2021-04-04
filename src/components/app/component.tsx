import React, { FC, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Layout } from "antd";
import { observer } from "mobx-react";

import { LogsList } from "../logs-list/component";
import { Footer } from "../footer";
import "./style.css";
import { Header } from "../header";
import { RootInstance } from "@src/store";
import { LogItemInstance } from "@store/logs";

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
      <Layout>
        <Header store={store} />
        <Layout.Content className="content">
          <LogsList store={store} />
        </Layout.Content>
        <Footer store={store} />
      </Layout>
    </div>
  );
});
