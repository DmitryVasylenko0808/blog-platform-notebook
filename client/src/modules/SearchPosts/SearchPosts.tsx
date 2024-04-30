import React from "react";
import Container from "../../components/Container";
import { useSearchPostsQuery } from "../../api/posts/postsApi";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import PostsList from "../../components/PostsList";

const SearchPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("value") ?? "";
  const page = parseFloat(searchParams.get("page") ?? "1");
  const limit = 8;

  const { data, isLoading, error } = useSearchPostsQuery({
    value,
    offset: limit * (page - 1),
    limit,
  });

  const handleClickPage = (pageNumber: number) => {
    setSearchParams({
      value,
      page: pageNumber.toString(),
    });
  };

  if (isLoading) {
    return <div>Loadiing...</div>;
  }

  if (error) {
    <div>Error</div>;
  }

  return (
    <section className="py-20">
      <Container>
        <div className="mb-14 py-2.5 border-b border-[#C4C4C4]">
          <h5 className="mb-0">
            Search Results For <span className="font-bold">{value}</span>
          </h5>
        </div>
        <Pagination
          totalPages={data ? Math.ceil(data?.totalCount / limit) : 0}
          countSiblings={1}
          currentPage={page}
          onPageClick={handleClickPage}
        >
          <PostsList data={data?.posts || []} />
        </Pagination>
      </Container>
    </section>
  );
};

export default SearchPosts;
