import React from "react";
import { useImage } from "../../hooks/useImage";
import { Link } from "react-router-dom";
import { Post as PostEntity } from "../../api/posts/dto/get-posts.dto";
import { MdModeComment, MdFavorite, MdRemoveRedEye } from "react-icons/md";

type PopularPostCardProps = {
  data: PostEntity;
};

const PopularPostCard = ({ data }: PopularPostCardProps) => {
  const avatarImageSrc = useImage("avatar", data?.author.profile.avatarUrl);

  return (
    <div className="w-[360px] p-6 bg-white rounded-md">
      <div className="mb-3">
        <span className="px-2 py-1 bg-notebook-200 rounded-md text-[#222222] text-[12px] font-normal">
          {data.category.title}
        </span>
      </div>
      <Link className="inline-block mb-4" to={`/${data.id}`}>
        <h5>{data.title}</h5>
      </Link>
      <div className="flex items-center gap-2.5">
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
    </div>
  );
};

export default PopularPostCard;
