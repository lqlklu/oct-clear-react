import React, { FC } from "react";
import { Layout } from "antd";
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
  return <Layout.Footer className="footer"></Layout.Footer>;
});
