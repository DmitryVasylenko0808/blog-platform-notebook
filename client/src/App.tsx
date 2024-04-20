import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasicLayout from "./layouts/BasicLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
