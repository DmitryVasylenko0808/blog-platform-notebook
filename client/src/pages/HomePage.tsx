import React from "react";
import { RecommendedPosts } from "../modules/RecommendedPosts";
import { RecentlyPosts } from "../modules/RecentlyPosts";

const HomePage = () => {
  return (
    <main>
      <RecommendedPosts />
      <RecentlyPosts />
    </main>
  );
};

export default HomePage;
