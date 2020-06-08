import React from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "../app";

const IndexPage = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default IndexPage;
