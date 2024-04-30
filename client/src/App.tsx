import React, { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasicLayout from "./layouts/BasicLayout";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import RequireAuth from "./components/RequireAuth";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import SearchPostsPage from "./pages/SearchPostsPage";

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
        <Route path="/search" element={<SearchPostsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
        <Route element={<RequireAuth />}>
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/:id/edit" element={<EditPostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
