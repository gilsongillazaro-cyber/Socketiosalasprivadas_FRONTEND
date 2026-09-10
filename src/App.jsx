import "./App.css";
import Home from "../Pages/Home.jsx";
import NotFound from "../Pages/NotFound.jsx";
import Chat from "../Pages/Chat.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);
  if (splash) {
    return (
      <div className="areaLogo">
        <h1>
          Socket<span>.IO</span> salas privadas
        </h1>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
