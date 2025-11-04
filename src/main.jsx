import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import ProjectDetailPizzeria from "./pages/ProjectDetailPizzeria.jsx";
import ProjectDetailTokens from "./pages/ProjectDetailTokens.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/quinta-menu" element={<ProjectDetail />} />
        <Route path="/project/pizzeria" element={<ProjectDetailPizzeria />} />
        <Route path="/project/tokens-case-study" element={<ProjectDetailTokens />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
