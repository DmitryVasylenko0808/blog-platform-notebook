import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  useDeletePostMutation,
  useGetPostDetailsQuery,
  useToggleFavoritePostMutation,
} from "../../api/posts/postsApi";
import { useAuth } from "../../hooks/useAuth";
import { useImage } from "../../hooks/useImage";
import { formatDate } from "../../utils/formatDate";
import { MdModeComment, MdFavorite, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Markdown from "react-markdown";
import Button from "../../components/Button";
import ToggleFavoritePost from "./ToggleFavoritePost";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isLoading, error } = useGetPostDetailsQuery(id as string);
  const [triggerDeletePost] = useDeletePostMutation();
  const [triggerToggleFavoritePost] = useToggleFavoritePostMutation();

  const avatarImageSrc = useImage("avatar", data?.author.profile.avatarUrl);
  const postImageSrc = useImage("post", data?.imageUrl);

  const handleDeletePost = () => {
    if (data?.id) {
      triggerDeletePost(data.id.toString())
        .unwrap()
        .then(() => {
          alert("Post is successfully deleted");
          navigate("/");
        })
        .catch((err) => alert(err.data.message));
    }
  };

  const handleToggleFavoritePost = () => {
    if (data?.id) {
      triggerToggleFavoritePost(data.id.toString())
        .unwrap()
        .catch((err) => {
          alert(err.data.message);

          if (err.data.statusCode === 401) {
            navigate("/sign-in");
          }
        });
    }
  };

  const date = formatDate(data?.createdAt);

  if (isLoading) {
    return <div className="">Loading</div>;
  }

  if (error) {
    alert("Oops... Something went wrong");
    navigate(-1);
  }

  const isUserPost = data?.authorId === user?.id;
  const isFavoritePost =
    !!user && !!data?.likers.find((l) => l.userId === user.id);

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
            <Link to={`/profile/${data?.authorId}`}>
              <img
                src={avatarImageSrc}
                alt="user_avatar"
                className="w-[18px] h-[18px] rounded-full"
              />
            </Link>
            <Link to={`/profile/${data?.authorId}`}>
              <span className="text-[12px] text-[#777777]">
                {data?.author.login}
              </span>
            </Link>
          </div>
          <span className="text-[12px] text-[#777777]">|</span>
          <span className="text-[12px] text-[#777777]">{date}</span>
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

        {isUserPost && (
          <div className="mb-8 flex gap-5">
            <Button
              variant="primary"
              size="small"
              as="link"
              to={`/${data?.id}/edit`}
            >
              Edit Post
            </Button>
            <Button variant="primary" size="small" onClick={handleDeletePost}>
              Delete Post
            </Button>
          </div>
        )}

        {data?.imageUrl && (
          <img
            className="w-full h-[500px] mb-8 rounded-md"
            src={postImageSrc}
            alt="post image"
          />
        )}

        <p>{data?.description}</p>

        <Markdown>{data?.body}</Markdown>

        <ToggleFavoritePost
          isFavorite={isFavoritePost}
          onFavorite={handleToggleFavoritePost}
        />
      </section>
    </Container>
  );
};

export default PostDetails;
