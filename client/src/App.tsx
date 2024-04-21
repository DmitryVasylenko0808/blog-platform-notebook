import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasicLayout from "./layouts/BasicLayout";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import { useAppDispatch } from "./redux/hooks";
import { useLazyGetMeQuery } from "./api/auth/authApi";
import { setUserInfo } from "./redux/slices/authSlice";
import { useAuth } from "./hooks/useAuth";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAuth();

  const [triggerGetUser] = useLazyGetMeQuery();

  console.log(token);

  useEffect(() => {
    if (!isAuthenticated && token) {
      triggerGetUser()
        .unwrap()
        .then((res) => dispatch(setUserInfo({ id: res.id, login: res.login })))
        .catch((err) => alert(err.data.message));
    }
  }, [token]);

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
