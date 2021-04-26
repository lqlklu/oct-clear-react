import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import Cookie from "../../utils/cookie";
import { useStore } from "../../store";

import "./style.scss";

const PasswordMsg = observer(() => {
  const { t } = useTranslation();
  return <>{t("signin.password-msg")}</>;
});

const UsernameMsg = observer(() => {
  const { t } = useTranslation();
  return <>{t("signin.username-msg")}</>;
});

export const Signin: FC = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  const his = useHistory();

  const onFinish = (values: any) => {
    let username = values.username;
    Cookie.set("username", username, 30);

    store.auth.setAuth(username);
    his.replace("/");
  };
  return (
    <div className="login">
      <div className="container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: <UsernameMsg /> }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("signin.username")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: <PasswordMsg /> }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t("signin.password")}
            />
          </Form.Item>
          <Form.Item>
            <Link className="login-form-forgot" to="/forget">
              {t("signin.forgetpwd")}
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t("signin.btn.login")}
            </Button>
            {t("signin.or")} <Link to="/signup">{t("signin.register")}</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
