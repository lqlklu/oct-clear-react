import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";

import axios, { AxiosResponse } from "axios";

import { useStore, LogItemInstance } from "../../store";
import { ResultPair } from "../result-pair";

import "./style.scss";

export interface FetchallResponse {
  status: string;
  payload: LogItemInstance[];
}

export const History: FC = observer(() => {
  const store = useStore();
  useEffect(() => {
    axios
      .get(store.info.server + "fetch_all?token=" + store.auth.uid)
      .then((data: AxiosResponse<FetchallResponse>) => {
        return data.data;
      })
      .then((response) => {
        if (response.status === "ok") {
          store.logs.init(response.payload);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.info.server, store.auth.uid]);
  return (
    <div className="history">
      {store.logs.sorted.map((it) => (
        <div className="item" key={it.path}>
          <ResultPair item={it} showBtn />
        </div>
      ))}
    </div>
  );
});
