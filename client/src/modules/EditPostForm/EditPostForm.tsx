import React, { useCallback, useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../api/categories/categoriesApi";
import {
  useEditPostMutation,
  useGetPostDetailsQuery,
} from "../../api/posts/postsApi";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { POSTS_IMAGES_URL } from "../../constants/api";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import TextArea from "../../components/TextArea";
import SimpleMDE from "react-simplemde-editor";
import Tag from "../../components/Tag";
import Button from "../../components/Button";
import ImageFileSelect from "../../components/ImageFileSelect";

import "easymde/dist/easymde.min.css";

type EditPostFormFields = {
  title: string;
  description: string;
  imageFile?: FileList;
};

const EditPostForn = () => {
  const { id } = useParams();

  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data, isLoading } = useGetPostDetailsQuery(id as string);
  const { data: categories } = useGetCategoriesQuery();
  const [triggerEditPost, { isLoading: isEditing }] = useEditPostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditPostFormFields>({
    values: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  useEffect(() => {
    if (data) {
      setBody(data.body);
      setCategoryId(data.categoryId);
    }
  }, [data]);

  const handleChangeBody = useCallback((body: string) => {
    setBody(body);
  }, []);

  const handleSelectCategory = (id: number) => {
    setCategoryId(id);
  };

  const submitHandler = (editData: EditPostFormFields) => {
    if (!body) {
      alert("Error. Body is required");
    } else if (!categoryId) {
      alert("Error. Category is not selected");
    } else {
      const { imageFile, ...other } = editData;

      const reqData = imageFile
        ? {
            id: data?.id as number,
            ...other,
            imageFile: imageFile[0],
            body,
            categoryId: categoryId.toString(),
          }
        : {
            id: data?.id as number,
            ...other,
            body,
            categoryId: categoryId.toString(),
          };

      triggerEditPost(reqData)
        .unwrap()
        .then(() => alert("Post is successfully edited"))
        .catch((err) => alert(err.data.message));
    }
  };

  const previewImageSrc = data?.imageUrl
    ? POSTS_IMAGES_URL + data?.imageUrl
    : "";
  const isDisabledButton = isLoading || isSubmitting || isEditing;

  return (
    <section className="py-20">
      <Container>
        <form
          className="w-[700px] mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="text-center">Editing Post</h1>
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
            <ImageFileSelect
              {...register("imageFile")}
              variant="post"
              previewImageSrc={previewImageSrc}
            />
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
                Edit Post
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default EditPostForn;
