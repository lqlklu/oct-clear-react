import React, { FC } from "react";
import { message, Upload } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ResultPair } from "../result-pair";
import { useStore } from "../../store";

import "./style.scss";

export const Main: FC = observer(() => {
  const store = useStore();
  const { t } = useTranslation();

  const props = {
    name: "file",
    data: {
      user_id: store.auth.uid,
    },
    multiple: true,
    showUploadList: false,
    action: store.info.server + "upload_images/",
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      const { status } = info.file;
      if (status === "done") {
        const { response } = info.file;
        console.log(response);
        if (response.status === "ok") {
          store.logs.add(response.payload);
          store.logs.setCurItem(response.payload);
          store.view.main.setResult();
          message.success(`${info.file.name}${t("main.upload-success")}`);
        } else {
          message.error(`${info.file.name}${t("main.upload-fail")}`);
        }
      } else if (status === "error") {
        message.error(`${info.file.name}${t("main.upload-fail")}`);
      }
    },
  };
  return (
    <div className="main">
      <div className="result">
        <div className="result-item">
          {store.view.main.result ? (
            <ResultPair item={store.logs.curItem} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="upload">
        <Upload.Dragger {...props}>
          <p className="upload-icon">
            <InboxOutlined />
          </p>
          <p className="upload-text">{t("main.upload")}</p>
        </Upload.Dragger>
      </div>
    </div>
  );
});
