import React, { FC } from "react";
import { Button, Image } from "antd";
import axios from "axios";

import "./style.css";
import { RootInstance } from "@src/store";
import { LogItemInstance } from "@src/store/logs";
import { observer } from "mobx-react";

export interface ResultPairProps {
  store: RootInstance;
  item: LogItemInstance;
}

export const ResultPair: FC<ResultPairProps> = observer(({ store, item }) => {
  const server = store.info.server;
  const url = server + "image/" + item.path;
  const onRemove = () => {
    axios.delete(url).then(({ data }) => {
      if (data.status === "ok") {
        console.log(data);
        store.logs.remove(item);
      }
    });
  };
  return (
    <div className="result-pair">
      <span className="result-pair__image">
        <Image src={url + "?type=upload"} alt="a" />
      </span>
      <span className="result-pair__image">
        <Image src={url + "?type=result"} alt="b" />
      </span>
      <div>
        <p>{item.name}</p>
        <p>{new Date(item.time * 1000).toLocaleString()}</p>
        <Button
          onClick={() => {
            window.open(url + "?type=result");
          }}
        >
          下载
        </Button>
        <Button onClick={onRemove} danger>
          移除
        </Button>
      </div>
    </div>
  );
});
