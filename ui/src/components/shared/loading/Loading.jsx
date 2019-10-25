import { Spinner } from "react-bootstrap";
import React from "react";

import "./Loading.css";

const Loading = () => {
  return <Spinner className="spinner" animation="grow" variant="info" />;
};
export default Loading;
