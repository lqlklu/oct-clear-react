import React, { FC } from "react";
import { message, Upload, Layout } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { RootInstance } from "@src/store";
import { LogItemInstance } from "@store/logs";

import "./style.css";

export interface FooterProps {
  store: RootInstance;
}

export interface UploadResponse {
  status: string;
  payload: LogItemInstance;
}

export const Footer: FC<FooterProps> = observer(({ store }) => {
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
    <Layout.Footer className="footer">
      <Upload.Dragger {...props}>
        <p className="footer__upload-icon">
          <InboxOutlined />
        </p>
        <p className="footer__upload-text">点击或拖拽上传</p>
      </Upload.Dragger>
    </Layout.Footer>
  );
});
