import "./styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./components/root/app";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <AppRoot />
    </StrictMode>
  );
}
