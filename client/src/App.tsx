import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasicLayout from "./layouts/BasicLayout";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated, token, authorize } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && token) {
      authorize(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<PostDetailsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;
