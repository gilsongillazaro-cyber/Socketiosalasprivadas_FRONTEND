import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import UserSContextProvider from "../Context/UserSelecionadoContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <UserSContextProvider>
      <ToastContainer />
      <App />
    </UserSContextProvider>
  </>,
);
