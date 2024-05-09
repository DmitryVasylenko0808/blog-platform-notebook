import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import PostsList from "../../components/PostsList";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SkeletonPostsList from "../../components/SkeletonPostsList";

const AuthorPosts = () => {
  const { profileId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseFloat(searchParams.get("page") ?? "1");
  const limit = 8;

  const { data, isLoading } = useGetPostsQuery({
    offset: limit * (page - 1),
    limit,
    authorId: profileId,
  });

  const handleClickPage = (pageNumber: number) => {
    setSearchParams({
      page: pageNumber.toString(),
    });
  };

  return (
    <section className="py-25">
      <Container>
        <Title filledText="Read" text="Author Blogs" />
        {data && (
          <Pagination
            totalPages={Math.ceil(data.totalCount / limit)}
            countSiblings={1}
            currentPage={page}
            onPageClick={handleClickPage}
          >
            <div className="pb-20">
              <PostsList data={data.posts} />
            </div>
          </Pagination>
        )}
        {isLoading && <SkeletonPostsList />}
      </Container>
    </section>
  );
};

export default AuthorPosts;
