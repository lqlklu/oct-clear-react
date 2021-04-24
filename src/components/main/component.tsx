import React, { FC } from "react";
import { message, Upload, Image } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";

import { RootInstance } from "@src/store";

import "./style.css";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

export interface MainProps {
  store: RootInstance;
}

export const Main: FC<MainProps> = observer(({ store }) => {
  const { t } = useTranslation();
  const props = {
    name: "file",
    data: {
      user_id: store.info.userId,
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
          store.view.main.setResult(response.payload.path);
          message.success(`${info.file.name} file uploaded successfully.`);
        } else {
          message.error(`${info.file.name} file upload failed.`);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="main">
      <div className="main__upload">
        <Upload.Dragger {...props}>
          <p className="main__upload-icon">
            <InboxOutlined />
          </p>
          <p className="main__upload-text">{t("main.upload")}</p>
        </Upload.Dragger>
      </div>
      <div className="main__result">
        <div className="main__result-item">
          {store.view.main.result ? (
            <Image
              src={
                store.info.server +
                "image/" +
                store.view.main.resultPath +
                "?type=result"
              }
              alt="a"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
});
