import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import PostsList from "../../components/PostsList";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

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
        <Pagination
          totalPages={data ? Math.ceil(data.totalCount / limit) : 0}
          countSiblings={1}
          currentPage={page}
          onPageClick={handleClickPage}
        >
          <div className="pb-20">
            <PostsList data={data?.posts || []} />
          </div>
        </Pagination>
      </Container>
    </section>
  );
};

export default AuthorPosts;
