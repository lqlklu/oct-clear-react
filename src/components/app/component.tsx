import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Upload, message, Button } from "antd";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import "./app.css";
import { ResultPair } from "../result-pair";

const host = "http://localhost:8000/";

interface Item {
  name: string;
  user_id: string;
  upload_path: string;
  result_path: string;
  time: number;
}

class Logs {
  items: Item[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  get sorted(): Item[] {
    return this.items.slice().sort((a, b) => {
      return a.time - b.time;
    });
  }
  init(l: Item[]) {
    this.items = l;
  }
  add(i: Item) {
    this.items.push(i);
  }
}
const logs = new Logs();

export const App = observer(() => {
  useEffect(() => {
    axios
      .get(host + "fetch_all/6479")
      .then((data: AxiosResponse<{ status: string; payload: Item[] }>) => {
        if (data.data.status === "ok") {
          logs.init(
            data.data.payload.map((it) => {
              return {
                name: it.name,
                user_id: it.user_id,
                upload_path: host + "image/" + it.upload_path,
                result_path: host + "image/" + it.result_path,
                time: it.time,
              };
            })
          );
        }
      });
  }, []);
  const props = {
    name: "file",
    multiple: true,
    action: host + "upload_images/",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }: any) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);
      formData.append("user_id", "6479");
      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              file
            );
          },
        })
        .then(({ data: response }) => {
          console.log("xxx", response);
          if (response.status === "ok") {
            var res = response.payload as Item;
            logs.add({
              name: res.name,
              user_id: res.user_id,
              upload_path: host + "image/" + res.upload_path,
              result_path: host + "image/" + res.result_path,
              time: res.time,
            });
          }
          onSuccess(response, file);
        })
        .catch(onError);
      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };
  return (
    <div className="app">
      <Upload.Dragger {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload.Dragger>
      {logs.sorted.map((it) => (
        <ResultPair
          key={it.name}
          aUrl={it.upload_path}
          bUrl={it.result_path}
          downloadUrl={it.result_path}
        />
      ))}
    </div>
  );
});
