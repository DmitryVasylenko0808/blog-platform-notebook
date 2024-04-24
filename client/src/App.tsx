import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasicLayout from "./layouts/BasicLayout";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "./hooks/useAuth";
import ProfilePage from "./pages/ProfilePage";

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
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
