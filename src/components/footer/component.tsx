import React, { FC } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./style.scss";

export const Footer: FC = observer(() => {
  const { t } = useTranslation();
  return (
    <Layout.Footer className="footer">
      <span>{t("copyright")}</span>
      <a
        className="icp"
        href="http://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://pic3.zhimg.com/80/v2-d0289dc0a46fc5b15b3363ffa78cf6c7.png"
          alt="police"
        />
        <span>蜀ICP备2021011946号</span>
      </a>
    </Layout.Footer>
  );
});
