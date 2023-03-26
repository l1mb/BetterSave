import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./components/root/app";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <StrictMode>
      <AppRoot />
    </StrictMode>
  );
}
