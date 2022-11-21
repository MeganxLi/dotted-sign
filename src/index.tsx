import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.scss";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
