import React, { FC } from "react";
import { Button, Form, Input, message } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { useStore } from "../../store";

import "./style.scss";
import axios from "axios";
import Cookie from "../../utils/cookie";
import { useHistory } from "react-router-dom";

export const VerifyCodeMsg: FC = observer(() => {
  const { t } = useTranslation();
  return <>{t("verify.code-msg")}</>;
});

export interface SigninResponse {
  status: string;
  payload: {
    uid: number;
    email: string;
  };
  code: number;
}

export const Verify: FC = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  const his = useHistory();
  const onFinish = (values: any) => {
    console.log(values);
    axios
      .get(
        store.info.server +
          "verify/?email=" +
          store.auth.verifyEmail +
          "&code=" +
          values.code
      )
      .then((res) => {
        console.log(res);
        let data = res.data as SigninResponse;
        if (data.status === "ok") {
          Cookie.set("uid", data.payload.uid.toString(), 30);
          store.auth.setAuth(data.payload.uid);
          his.replace("/");
        } else if (data.status === "err") {
          if (data.code === 404) {
            message.error("Wrong username or password");
          } else if (data.code === 403) {
            message.error("error verify code");
          }
        }
      });
  };
  return (
    <div className="verify">
      <div className="container">
        <Form
          name="normal_verify"
          className="verify-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="code"
            rules={[{ required: true, message: <VerifyCodeMsg /> }]}
          >
            <Input placeholder={t("verify.code")} />
          </Form.Item>
          <Form.Item className="primary">
            <Button className="btn register" type="primary" htmlType="submit">
              {t("verify.btn.verify")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
