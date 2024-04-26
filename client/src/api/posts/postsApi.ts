import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetPostsDTO } from "./dto/get-posts.dto";
import { GetPostDelailsDTO } from "./dto/get-post-details.dto";
import { GetRelatedPostsDTO } from "./dto/get-related-posts.dto";
import { GetCommentsDTO } from "./dto/get-comments.dto";

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
    id: number;
    title: string;
    description: string;
    body: string;
    categoryId: number;
};

type GetCommentsParams = {
    postId: string;
    offset: number;
    limit: number;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/posts",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Post", "Comment"],
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
            query: ({ id, ...body}) => {
                console.log(body);

                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value.toString()));

                return {
                    url: `/${id}`,
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
        }),
        getComments: builder.query<GetCommentsDTO, GetCommentsParams>({
            query: ({ postId, offset, limit }) => `/${postId}/comments?offset=${offset}&limit=${limit}`,
            providesTags: ["Comment"]
        })
    })
});

export const {
    useGetPostsQuery,
    useGetRelatedPostsQuery,
    useGetPostDetailsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useGetCommentsQuery
} = postsApi;