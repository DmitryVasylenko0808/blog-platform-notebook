import React, { useCallback, useState } from "react";
import { useGetCategoriesQuery } from "../../api/categories/categoriesApi";
import { useCreatePostMutation } from "../../api/posts/postsApi";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import TextArea from "../../components/TextArea";
import SimpleMDE from "react-simplemde-editor";
import Tag from "../../components/Tag";
import Button from "../../components/Button";
import "easymde/dist/easymde.min.css";
import ImageFileSelect from "../../components/ImageFileSelect";

type CreatePostFormFields = {
  title: string;
  description: string;
  body: string;
  categoryId: number;
  imageFile?: FileList;
};

const CreatePostForm = () => {
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormFields>();

  const { data: categories } = useGetCategoriesQuery();
  const [triggerCreatePost, { isLoading }] = useCreatePostMutation();

  const handleChangeBody = useCallback((body: string) => {
    setBody(body);
  }, []);

  const handleSelectCategory = (id: number) => {
    setCategoryId(id);
  };

  const submitHandler = (data: CreatePostFormFields) => {
    if (!body) {
      alert("Error. Body is required");
    } else if (!categoryId) {
      alert("Error. Category is not selected");
    } else {
      const { imageFile, ...other } = data;

      const reqData = imageFile
        ? {
            ...other,
            imageFile: imageFile[0],
            body,
            categoryId: categoryId.toString(),
          }
        : {
            ...other,
            body,
            categoryId: categoryId.toString(),
          };

      triggerCreatePost(reqData)
        .unwrap()
        .then(() => alert("Post is successfully created"))
        .catch((err) => alert(err.data.message));
    }
  };

  const isDisabledButton = isLoading || isSubmitting;

  return (
    <section className="py-20">
      <Container>
        <form
          className="w-[700px] mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="text-center">Creating Post</h1>
          <div className="mb-4 flex flex-col gap-6">
            <TextField
              {...register("title", { required: "Title is required" })}
              placeholder="Input title..."
              error={errors.title?.message}
            />
            <TextArea
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Input description..."
              error={errors.description?.message}
            />
            <ImageFileSelect {...register("imageFile")} variant="post" />
            <SimpleMDE
              value={body}
              onChange={handleChangeBody}
              className="border border-notebook-250"
            />
            <div>
              <h3 className="mb-4">Select category</h3>
              <div className="flex flex-wrap gap-4">
                {categories?.map((c) => (
                  <Tag
                    data={c}
                    isActive={c.id === categoryId}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectCategory(c.id);
                    }}
                    key={c.id}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="small"
                disabled={isDisabledButton}
              >
                Create Post
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default CreatePostForm;
