import React from "react";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAddAnswerMutation } from "../../api/posts/postsApi";

type ReplyCommentFormProps = {
  commentId: number;
};

type ReplyCommentFormFields = {
  body: string;
};

const ReplyCommentForm = ({ commentId }: ReplyCommentFormProps) => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReplyCommentFormFields>();

  const [triggerAddAnswer, { isLoading }] = useAddAnswerMutation();

  const submitHandler = (data: ReplyCommentFormFields) => {
    triggerAddAnswer({
      postId: id as string,
      commentId: commentId.toString(),
      body: data.body,
    })
      .unwrap()
      .then(() => alert("The comment successfully replied"))
      .catch((err) => alert(err.data.message));
  };

  const isButtonDisabled = isLoading || isSubmitting;

  return (
    <form className="w-full mb-5" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex gap-4">
        <img
          className="w-[50px] h-[50px]"
          src="https://avatarfiles.alphacoders.com/114/114650.jpg"
          alt="user avatar"
        />
        <div className="flex-auto flex flex-col gap-4">
          <TextArea
            {...register("body", { required: "Text is required" })}
            rows={4}
            placeholder="Write a comment"
            error={errors.body?.message}
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              type="submit"
              size="small"
              disabled={!!isButtonDisabled}
            >
              Reply Comment
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReplyCommentForm;
