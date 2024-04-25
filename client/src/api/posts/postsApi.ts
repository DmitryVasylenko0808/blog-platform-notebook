import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetPostsDTO } from "./dto/get-posts.dto";
import { GetPostDelailsDTO } from "./dto/get-post-details.dto";
import { GetRelatedPostsDTO } from "./dto/get-related-posts.dto";

type GetPostsParams = {
    offset: number;
    limit: number;
    type?: "featured" | "popular" | "recently";
    categoryIds?: string;
    authorId?: string;
}

type GetRelatedPostsParams = {
    id: string;
    offset: number;
    limit: number;
}

type CreatePostParams = {
    title: string;
    description: string;
    body: string;
    categoryId: number;
};

type EditPostParams = {
    title: string;
    description: string;
    body: string;
    categoryId: number;
};

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/posts",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Post"],
    endpoints: builder => ({
        getPosts: builder.query<GetPostsDTO, GetPostsParams>({
            query: ({ limit, offset, type, categoryIds, authorId }) => `/?offset=${offset}&limit=${limit}&type=${type}&categoryIds=${categoryIds ?? ""}&authorId=${authorId ?? ""}`,
            providesTags: ["Post"]
        }),
        getRelatedPosts: builder.query<GetRelatedPostsDTO, GetRelatedPostsParams>({
            query: ({ id, offset, limit }) => `/${id}/related/?offset=${offset}&limit=${limit}`,
            providesTags: ["Post"]
        }),
        getPostDetails: builder.query<GetPostDelailsDTO, string>({
            query: (id) => `/${id}/details`,
            providesTags: ["Post"]
        }),
        createPost: builder.mutation<void, CreatePostParams>({
            query: (body) => {
                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value.toString()));

                return {
                    url: "/",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Post"]
        }),
        editPost: builder.mutation<void, EditPostParams>({
            query: (body) => {
                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value.toString()));

                return {
                    url: "/",
                    method: "PATCH",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Post"]
        }),
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        })
    })
});

export const {
    useGetPostsQuery,
    useGetRelatedPostsQuery,
    useGetPostDetailsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation
} = postsApi;