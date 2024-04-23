import React from "react";
import Container from "../../components/Container";
import { MdModeComment, MdFavorite, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { useGetPostDetailsQuery } from "../../api/posts/postsApi";
import { API_URL_POSTS_IMAGES } from "../../consts";

const PostDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPostDetailsQuery(id as string);

  if (isLoading) {
    return <div className="">Loading</div>;
  }

  if (error) {
    alert("Error");
  }

  return (
    <Container>
      <section className="px-16 pt-20 pb-10">
        <div className="mb-4">
          <span className="px-2 py-1 bg-notebook-200 rounded-md text-[#222222] text-[12px] font-normal">
            {data?.category.title}
          </span>
        </div>
        <Link className="inline-block mb-4" to={`/${data?.id}`}>
          <h1 className="mb-0">{data?.title}</h1>
        </Link>
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <Link to={""}>
              <img
                src="https://avatarfiles.alphacoders.com/114/114650.jpg"
                alt="user_avatar"
                className="w-[18px] h-[18px] rounded-full"
              />
            </Link>
            <Link to={""}>
              <span className="text-[12px] text-[#777777]">
                {data?.author.login}
              </span>
            </Link>
          </div>
          <span className="text-[12px] text-[#777777]">|</span>
          <span className="text-[12px] text-[#777777]">{`${data?.createdAt}`}</span>
          <span className="text-[12px] text-[#777777]">|</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#777777] text-[12px]">
              <MdModeComment size={16} />
              {data?.commentsCount}
            </div>
            <div className="flex items-center gap-1 text-[#777777] text-[12px]">
              <MdFavorite size={16} />
              {data?.likesCount}
            </div>
            <div className="flex items-center gap-1 text-[#777777] text-[12px]">
              <MdRemoveRedEye size={16} />
              {data?.viewsCount}
            </div>
          </div>
        </div>

        {data?.imageUrl && (
          <img
            className="w-full h-[500px] mb-8 rounded-md"
            src={`API_URL_POSTS_IMAGES/${data.imageUrl}`}
            alt="image"
          />
        )}

        <p>{data?.description}</p>

        <Markdown>{data?.body}</Markdown>

        <div className="mb-7 px-6 flex gap-8">
          <div className="flex items-center gap-3 text-[#777777] text-[22px]">
            <MdFavorite size={28} />
            {data?.likesCount}
          </div>
          <div className="flex items-center gap-3 text-[#777777] text-[22px]">
            <MdModeComment size={28} />
            {data?.commentsCount}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PostDetails;
