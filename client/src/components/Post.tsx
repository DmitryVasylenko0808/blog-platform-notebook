import React from "react";
import { Link } from "react-router-dom";
import { MdModeComment, MdFavorite, MdRemoveRedEye } from "react-icons/md";
import { Post as PostEntity } from "../api/posts/dto/get-posts.dto";

type PostProps = {
  data: PostEntity;
};

const Post = ({ data }: PostProps) => {
  const date = `${data.createdAt}`;

  return (
    <div className="w-[615px]">
      <div className="mb-2">
        <span className="px-2 py-1 bg-notebook-200 rounded-md text-[#222222] text-[12px] font-normal">
          {data.category.title}
        </span>
      </div>
      <Link className="inline-block mb-5" to={""}>
        <h1>{data.title}</h1>
      </Link>
      <div className="mb-4 flex items-center gap-2.5">
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
              {data.author.login}
            </span>
          </Link>
        </div>
        <span className="text-[12px] text-[#777777]">|</span>
        <span className="text-[12px] text-[#777777]">{date}</span>
        <span className="text-[12px] text-[#777777]">|</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#777777] text-[12px]">
            <MdModeComment size={16} />
            {data.commentsCount}
          </div>
          <div className="flex items-center gap-1 text-[#777777] text-[12px]">
            <MdFavorite size={16} />
            {data.likesCount}
          </div>
          <div className="flex items-center gap-1 text-[#777777] text-[12px]">
            <MdRemoveRedEye size={16} />
            {data.viewsCount}
          </div>
        </div>
      </div>
      <p>{data.description}</p>
    </div>
  );
};

export default Post;
