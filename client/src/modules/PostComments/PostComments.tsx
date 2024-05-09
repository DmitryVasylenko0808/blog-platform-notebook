import React, { useState } from "react";
import Container from "../../components/Container";
import PostCommentsList from "./PostCommentsList";
import { useGetCommentsQuery } from "../../api/posts/postsApi";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination";
import AddCommentForm from "./AddCommentForm";
import SkeleteonComments from "./SkeleteonComments";

const PostComments = () => {
  const limit = 8;

  const { id: postId } = useParams();

  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useGetCommentsQuery({
    postId: postId as string,
    offset: page * limit,
    limit,
  });

  const handleClickPage = (pageNumber: number) => {
    setPage(pageNumber - 1);
  };

  return (
    <section className="pt-2 pb-10">
      <Container>
        <div className="mb-4 px-16">
          <div className="mb-10 py-2.5 border-b border-[#C4C4C4]">
            <h4 className="mb-0">{data?.totalCount} Comments</h4>
          </div>
          <AddCommentForm />
          {data && (
            <Pagination
              totalPages={Math.ceil(data?.totalCount / limit)}
              currentPage={page + 1}
              countSiblings={1}
              onPageClick={handleClickPage}
            >
              <PostCommentsList data={data.comments} />
            </Pagination>
          )}
          {isLoading && <SkeleteonComments />}
        </div>
      </Container>
    </section>
  );
};

export default PostComments;
