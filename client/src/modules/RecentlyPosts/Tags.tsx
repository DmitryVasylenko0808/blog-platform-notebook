import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useGetCategoriesQuery } from "../../api/categories/categoriesApi";
import Tag from "./Tag";
import { useSearchParams } from "react-router-dom";

const Tags = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedtags] = useState<number[]>([]);

  const { data } = useGetCategoriesQuery();

  useEffect(() => {
    let tags: string | string[] | null = searchParams.get("categoryIds");
    tags = tags ? tags.split(",") : [];

    setSelectedtags(tags.map((t) => parseFloat(t)));
  }, []);

  const handleClickCategory = (id: number) => {
    let updatedselectedtags;

    if (selectedTags.includes(id)) {
      updatedselectedtags = selectedTags.filter((tagId) => tagId !== id);
    } else {
      updatedselectedtags = [...selectedTags, id];
    }

    setSelectedtags(updatedselectedtags);
    setSearchParams({
      page: "1",
      categoryIds: updatedselectedtags.join(","),
    });
  };

  return (
    <aside className="">
      <Title filledText="Search" text="With Tags" />
      <div className="flex flex-wrap gap-4">
        {data?.map((tag) => (
          <Tag
            data={tag}
            isActive={selectedTags.includes(tag.id)}
            onClick={() => handleClickCategory(tag.id)}
            key={tag.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default Tags;
