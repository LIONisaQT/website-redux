// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./declarations.d.ts" />

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
