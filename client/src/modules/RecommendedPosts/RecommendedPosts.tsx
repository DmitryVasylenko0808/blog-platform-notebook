import React from "react";
import Container from "../../components/Container";
import FeaturedPosts from "./FeaturedPosts";

const RecommendedPosts = () => {
  return (
    <div className="bg-notebook-100 pt-[80px] pb-[88px]">
      <Container>
        <div className="flex">
          <FeaturedPosts />
        </div>
      </Container>
    </div>
  );
};

export default RecommendedPosts;
