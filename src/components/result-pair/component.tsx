import React, { FC } from "react";
import "./style.css";

export interface ResultPairProps {
  aUrl: string;
  bUrl: string;
  downloadUrl: string;
}

export const ResultPair: FC<ResultPairProps> = ({
  aUrl,
  bUrl,
  downloadUrl,
}) => {
  return (
    <div className="result-pair">
      <img className="result-pair__image" src={aUrl} alt="a" />
      <img className="result-pair__image" src={bUrl} alt="b" />
    </div>
  );
};
