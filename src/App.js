import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/create-product" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
