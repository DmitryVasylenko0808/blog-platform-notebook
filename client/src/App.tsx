import React, { lazy, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router";
import BasicLayout from "./layouts/BasicLayout";
import RequireAuth from "./components/RequireAuth";

const HomePage = lazy(() => import("./pages/HomePage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const SearchPostsPage = lazy(() => import("./pages/SearchPostsPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const CreatePostPage = lazy(() => import("./pages/CreatePostPage"));
const EditPostPage = lazy(() => import("./pages/EditPostPage"));

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
