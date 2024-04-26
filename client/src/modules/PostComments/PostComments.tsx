import React, { useState } from "react";
import Container from "../../components/Container";
import ToggleFavoritePost from "./ToggleFavoritePost";
import PostCommentsList from "./PostCommentsList";
import { useGetCommentsQuery } from "../../api/posts/postsApi";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination";

const PostComments = () => {
  const limit = 8;

  const { id: postId } = useParams();

  const [page, setPage] = useState<number>(0);

  const { data, isLoading, error } = useGetCommentsQuery({
    postId: postId as string,
    offset: page * limit,
    limit,
  });

  const handleClickPage = (pageNumber: number) => {
    setPage(pageNumber - 1);
  };

  if (isLoading) {
    return (
      <section className="pt-2 pb-10">
        <Container>
          <div className="mb-4 px-16">Loading...</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-2 pb-10">
      <Container>
        <div className="mb-4 px-16">
          <div className="py-2.5 border-b border-[#C4C4C4]">
            <h4 className="mb-0">{data?.totalCount} Comments</h4>
          </div>
          <ToggleFavoritePost />
          <Pagination
            totalPages={data ? Math.ceil(data?.totalCount / limit) : 0}
            currentPage={page + 1}
            countSiblings={1}
            onPageClick={handleClickPage}
          >
            <PostCommentsList data={data?.comments || []} />
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default PostComments;
