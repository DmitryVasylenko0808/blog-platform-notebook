import React from "react";
import { Link } from "react-router-dom";
import { MdModeComment, MdFavorite, MdRemoveRedEye } from "react-icons/md";
import { Post as PostEntity } from "../api/posts/dto/get-posts.dto";
import { AVATARS_URL, NULL_AVATAR_URL } from "../constants/api";
import { formatDate } from "../utils/formatDate";

type PostProps = {
  data: PostEntity;
};

const Post = ({ data }: PostProps) => {
  const date = formatDate(data.createdAt);

  const avatarImageSrc = data?.author.profile.avatarUrl
    ? AVATARS_URL + data.author.profile.avatarUrl
    : NULL_AVATAR_URL;

  return (
    <div className="w-[615px]">
      <div className="mb-2">
        <span className="px-2 py-1 bg-notebook-200 rounded-md text-[#222222] text-[12px] font-normal">
          {data.category.title}
        </span>
      </div>
      <Link className="inline-block mb-5" to={`/${data.id}`}>
        <h1 className="mb-0">{data.title}</h1>
      </Link>
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${data.authorId}`}>
            <img
              src={avatarImageSrc}
              alt="user_avatar"
              className="w-[18px] h-[18px] rounded-full"
            />
          </Link>
          <Link to={`/profile/${data.authorId}`}>
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
      <p className="mb-0">{data.description}</p>
    </div>
  );
};

export default Post;
