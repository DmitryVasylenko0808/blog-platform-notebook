import React from "react";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAddCommentMutation } from "../../api/posts/postsApi";

type AddCommentFormFields = {
  body: string;
};

const AddCommentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCommentFormFields>();

  const [triggerAddComment, { isLoading }] = useAddCommentMutation();

  const submitHandler = (data: AddCommentFormFields) => {
    triggerAddComment({
      postId: id as string,
      body: data.body,
    })
      .unwrap()
      .catch((err) => {
        alert(err.data.message);

        if (err.data.statusCode === 401) {
          navigate("/sign-in");
        }
      });
  };

  const isButtonDisabled = isLoading || isSubmitting;

  return (
    <form className="w-full mb-5" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex gap-4">
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
              Leave Comment
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCommentForm;
