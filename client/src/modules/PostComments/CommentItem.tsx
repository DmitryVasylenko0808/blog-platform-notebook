import React from "react";
import { Link } from "react-router-dom";
import { MdReply } from "react-icons/md";
import { Comment } from "../../api/posts/dto/get-comments.dto";

type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <li className="flex gap-4">
      <Link className="min-w-[50px]" to={`/profile/${data.authorId}`}>
        <img
          className="w-[50px] h-[50px]"
          src="https://avatarfiles.alphacoders.com/114/114650.jpg"
          alt="user avatar"
        />
      </Link>
      <div className="flex-auto">
        <div className="mb-4 flex">
          <div className="flex-auto">
            <h5 className="">{`${data.author.profile.firstName} ${data.author.profile.secondName}`}</h5>
            <Link to={`/profile/${data.authorId}`}>
              <span className="">{data.author.login}</span>
            </Link>
          </div>
          <div className="">
            <button className="" aria-label="reply comment">
              <MdReply size={28} />
            </button>
          </div>
        </div>
        <div className="">
          <p className="">{data.body}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
