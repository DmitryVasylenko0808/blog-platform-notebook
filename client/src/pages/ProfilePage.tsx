import React from "react";
import { AuthorProfile } from "../modules/AuthorProfile";
import { AuthorPosts } from "../modules/AuthorPosts";

const ProfilePage = () => {
  return (
    <>
      <AuthorProfile />
      <AuthorPosts />
    </>
  );
};

export default ProfilePage;
