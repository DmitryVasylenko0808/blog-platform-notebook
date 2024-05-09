import React, { useEffect } from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Pagination from "../../components/Pagination";
import PostsList from "../../components/PostsList";
import Tags from "./Tags";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import { useSearchParams } from "react-router-dom";
import SkeletonPostsList from "../../components/SkeletonPostsList";

const RecentlyPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseFloat(searchParams.get("page") ?? "1");
  const categoryIds = searchParams.get("categoryIds") ?? "";
  const limit = 8;

  const { data, isLoading } = useGetPostsQuery({
    offset: limit * (page - 1),
    limit,
    type: "recently",
    categoryIds,
  });

  const handleClickPage = (pageNumber: number) => {
    setSearchParams({
      page: pageNumber.toString(),
      categoryIds,
    });
  };

  return (
    <section className="pt-20 pb-24">
      <Container>
        <div className="flex">
          <div className="">
            <Title filledText="Recently" text="Posted" />
            {data && (
              <Pagination
                totalPages={Math.ceil(data?.totalCount / limit)}
                countSiblings={1}
                currentPage={page}
                onPageClick={handleClickPage}
              >
                <div className="pr-[320px] pb-20">
                  <PostsList data={data.posts} />
                </div>
              </Pagination>
            )}
            {isLoading && <SkeletonPostsList />}
          </div>
          <Tags />
        </div>
      </Container>
    </section>
  );
};

export default RecentlyPosts;
