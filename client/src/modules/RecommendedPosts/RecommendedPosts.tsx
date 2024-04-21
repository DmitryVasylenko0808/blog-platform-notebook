import React from "react";
import Container from "../../components/Container";
import FeaturedPosts from "./FeaturedPosts";
import PopularPosts from "./PopularPosts";

const RecommendedPosts = () => {
  return (
    <section className="bg-notebook-100 pt-[80px] pb-[88px]">
      <Container>
        <div className="flex justify-between">
          <FeaturedPosts />
          <PopularPosts />
        </div>
      </Container>
    </section>
  );
};

export default RecommendedPosts;
