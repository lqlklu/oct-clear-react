import React, { FC } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import Cookie from "../../utils/cookie";
import { useStore } from "../../store";

import "./style.scss";
import axios from "axios";

const PasswordMsg = observer(() => {
  const { t } = useTranslation();
  return <>{t("signin.password-msg")}</>;
});

const EmailMsg = observer(() => {
  const { t } = useTranslation();
  return <>{t("signin.email-msg")}</>;
});

const SigninButton = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  const his = useHistory();
  return (
    <>
      <Form.Item>
        <Link className="login-form-forgot" to="/forget">
          {t("signin.forgetpwd")}
        </Link>
      </Form.Item>
      <Form.Item>
        <Button
          className="btn register"
          onClick={() => {
            store.view.signin.signup();
          }}
        >
          {t("signin.btn.register")}
        </Button>
        <Button
          className="btn try"
          onClick={() => {
            store.auth.setTry();
            his.replace("/");
          }}
        >
          {t("signin.btn.try")}
        </Button>
      </Form.Item>
      <Form.Item className="primary">
        <Button type="primary" htmlType="submit" className="btn login">
          {t("signin.btn.login")}
        </Button>
      </Form.Item>
    </>
  );
});

const SignupButton = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  const his = useHistory();
  return (
    <>
      <Form.Item>
        <Button
          className="btn login"
          onClick={() => {
            store.view.signin.signin();
          }}
        >
          {t("signin.btn.login")}
        </Button>
        <Button
          className="btn try"
          onClick={() => {
            store.auth.setTry();
            his.replace("/");
          }}
        >
          {t("signin.btn.try")}
        </Button>
      </Form.Item>
      <Form.Item className="primary">
        <Button className="btn register" type="primary" htmlType="submit">
          {t("signin.btn.register")}
        </Button>
      </Form.Item>
    </>
  );
});

export interface SigninResponse {
  status: string;
  payload: {
    uid: number;
    email: string;
  };
  code: number;
}

export interface SignupResponse {
  status: string;
  payload: {
    uid: number;
    email: string;
  };
  code: number;
}

export const Signin: FC = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  const his = useHistory();

  const signin = (values: any) => {
    let data = new FormData();
    data.set("uid", "0");
    data.set("email", values.email);
    data.set("password", values.password);
    axios.post(store.info.server + "signin/", data).then((res) => {
      console.log(res);
      let data = res.data as SigninResponse;
      if (data.status === "ok") {
        Cookie.set("uid", data.payload.uid.toString(), 30);
        store.auth.setAuth(data.payload.uid);
        his.replace("/");
      } else if (data.status === "err") {
        if (data.code === 404) {
          message.error("Wrong username or password");
        }
      }
    });
  };
  const signup = (values: any) => {
    let data = new FormData();
    data.set("email", values.email);
    data.set("password", values.password);
    axios.post(store.info.server + "signup/", data).then((res) => {
      console.log(res);
      let data = res.data as SignupResponse;
      if (data.status === "ok") {
        Cookie.set("uid", data.payload.uid.toString(), 30);
        store.auth.setAuth(data.payload.uid);
        his.replace("/");
      } else if (data.status === "err") {
        if (data.code === 403) {
          message.error("User has exist.");
        }
      }
    });
  };
  const onFinish = (values: any) => {
    console.log(values);
    if (store.view.signin.isSignup) {
      signup(values);
    } else {
      signin(values);
    }
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
            name="email"
            rules={[{ required: true, message: <EmailMsg /> }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t("signin.email")}
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
          {store.view.signin.isSignup ? <SignupButton /> : <SigninButton />}
        </Form>
      </div>
    </div>
  );
});
