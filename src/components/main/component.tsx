import React, { FC } from "react";
import { message, Upload, Image } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";

import { RootInstance } from "@src/store";

import "./style.css";
import { observer } from "mobx-react";

export interface MainProps {
  store: RootInstance;
}

export const Main: FC<MainProps> = observer(({ store }) => {
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
    <div className="upload-content">
      <Upload.Dragger {...props}>
        <p className="footer__upload-icon">
          <InboxOutlined />
        </p>
        <p className="footer__upload-text">点击或拖拽上传</p>
      </Upload.Dragger>
      <div className="result">
        {store.view.main.result ? (
          <Image
            className="result__image"
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
  );
});
