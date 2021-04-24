import React, { FC } from "react";
import { observer } from "mobx-react";

import "./style.scss";

export const Login: FC = observer(() => {
  return (
    <div className="login">
      <div className="container"></div>
    </div>
  );
});
