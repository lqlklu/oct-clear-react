import React, { FC } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./style.scss";

export const Footer: FC = observer(() => {
  const { t } = useTranslation();
  return <Layout.Footer className="footer">{t("copyright")}</Layout.Footer>;
});
