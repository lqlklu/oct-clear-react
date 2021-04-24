import React, { FC } from "react";
import { Button, Image, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import { RootInstance } from "@src/store";
import { LogItemInstance } from "@src/store/logs";
import { observer } from "mobx-react";

import "./style.scss";
import { useTranslation } from "react-i18next";

export interface ResultPairProps {
  store: RootInstance;
  item: LogItemInstance;
}

export const ResultPair: FC<ResultPairProps> = observer(({ store, item }) => {
  const { t } = useTranslation();
  const server = store.info.server;
  const url = server + "image/" + item.path;
  const onRemove = () => {
    Modal.confirm({
      title: "确认",
      icon: <ExclamationCircleOutlined />,
      content: "确认移除吗？",
      onOk() {
        axios.delete(url).then(({ data }) => {
          if (data.status === "ok") {
            console.log(data);
            store.logs.remove(item);
          }
        });
      },
    });
  };
  return (
    <div className="result-pair">
      <div className="result-pair__images">
        <span className="result-pair__image">
          <Image src={url + "?type=upload"} alt="a" />
        </span>
        <span className="result-pair__image">
          <Image src={url + "?type=result"} alt="b" />
        </span>
      </div>
      <div>
        <p>{item.name}</p>
        <p>{new Date(item.time * 1000).toLocaleString()}</p>
        <Button
          className="result-pair__btn-ok"
          onClick={() => {
            window.open(url + "?type=result");
          }}
        >
          {t("button.download")}
        </Button>
        <Button onClick={onRemove} danger>
          {t("button.remove")}
        </Button>
      </div>
    </div>
  );
});
