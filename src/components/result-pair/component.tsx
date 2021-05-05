import React, { FC } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Button, Image, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import { useStore } from "../../store";
import { LogItemInstance } from "@src/store/logs";

import "./style.scss";

export interface ResultPairProps {
  item: LogItemInstance;
  showBtn?: boolean;
}

export const ResultPair: FC<ResultPairProps> = observer(({ item, showBtn }) => {
  const store = useStore();
  const { t } = useTranslation();
  const server = store.info.server;
  const url = server + "image/" + item.name;
  const onRemove = () => {
    Modal.confirm({
      title: t("message.confirm.remove.title"),
      icon: <ExclamationCircleOutlined />,
      content: t("message.confirm.remove.content"),
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
      <div className="image-pair">
        <span className="image">
          <Image src={url + "?type=upload"} alt="a" />
        </span>
        <span className="image">
          <Image src={url + "?type=result"} alt="b" />
        </span>
      </div>
      <div className="info">
        <p>{item.name}</p>
        <p>{new Date(item.time * 1000).toLocaleString()}</p>
        {showBtn === true ? (
          <>
            <Button
              className="btn-ok"
              onClick={() => {
                window.open(url + "?type=result");
              }}
            >
              {t("button.download")}
            </Button>
            <Button onClick={onRemove} danger>
              {t("button.remove")}
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});
