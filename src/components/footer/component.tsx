import React, { FC } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { RootInstance } from "@src/store";
import { LogItemInstance } from "@store/logs";

import "./style.scss";

export interface FooterProps {
  store: RootInstance;
}

export interface UploadResponse {
  status: string;
  payload: LogItemInstance;
}

export const Footer: FC<FooterProps> = observer(({ store }) => {
  const { t } = useTranslation();
  return <Layout.Footer className="footer">{t("copyright")}</Layout.Footer>;
});
