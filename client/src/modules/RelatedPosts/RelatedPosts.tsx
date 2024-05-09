import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { useGetRelatedPostsQuery } from "../../api/posts/postsApi";
import { useParams } from "react-router";
import RelatedPostCard from "./RelatedPostCard";
import SkeletonRelatedPosts from "./SkeletonRelatedPosts";

const RelatedPosts = () => {
  const offset = 0;
  const limit = 3;

  const { id } = useParams();

  const { data, isLoading } = useGetRelatedPostsQuery({
    id: id as string,
    offset,
    limit,
  });

  return (
    <section className="py-10">
      <Container>
        <Title filledText="See Related" text="Posts" />
        {data && (
          <div className="flex gap-4">
            {data.map((post) => (
              <RelatedPostCard data={post} />
            ))}
          </div>
        )}
        {isLoading && <SkeletonRelatedPosts />}
      </Container>
    </section>
  );
};

export default RelatedPosts;
