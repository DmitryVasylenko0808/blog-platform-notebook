import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetPostsDTO } from "./dto/get-posts.dto";
import { GetPostDelailsDTO } from "./dto/get-post-details.dto";
import { GetRelatedPostsDTO } from "./dto/get-related-posts.dto";
import { GetCommentsDTO } from "./dto/get-comments.dto";
import { API_URL_POSTS } from "../../constants/api";

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
    categoryId: string;
    imageFile?: File;
};

type EditPostParams = {
    id: number;
    title: string;
    description: string;
    body: string;
    categoryId: string;
    imageFile?: File;
};

type GetCommentsParams = {
    postId: string;
    offset: number;
    limit: number;
};

type GetAnswersParams = { 
    postId: string; 
    commentId: string; 
};

type AddCommentParams = {
    postId: string;
    body: string;
};

type DeleteCommentParams = {
    postId: string;
    commentId: string;
};

type SearchPostsParams = {
    value: string;
    offset: number;
    limit: number;
};

type AddAnswerParams = {
    postId: string; 
    commentId: string;
    body: string;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_POSTS,
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
                Object.entries(body).forEach(([key, value]) => formData.append(key, value));

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
            query: ({ id, ...body }) => {
                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value));

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
        toggleFavoritePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}/toggle-favorite`,
                method: "PATCH"
            }),
            invalidatesTags: ["Post"]
        }),
        searchPosts: builder.query<GetPostsDTO, SearchPostsParams>({
            query: ({ value, offset, limit }) => `/search?value=${value}&offset=${offset}&limit=${limit}`,
            providesTags: ["Post"]
        }),
        getComments: builder.query<GetCommentsDTO, GetCommentsParams>({
            query: ({ postId, offset, limit }) => `/${postId}/comments?offset=${offset}&limit=${limit}`,
            providesTags: ["Comment"]
        }),
        addComment: builder.mutation<void, AddCommentParams>({
            query: ({ postId, body }) => ({
                url: `/${postId}/comments`,
                method: "POST",
                body: { body }
            }),
            invalidatesTags: ["Comment", "Post"]
        }),
        deleteComment: builder.mutation<void, DeleteCommentParams>({
            query: ({ postId, commentId }) => ({
                url: `/${postId}/comments/${commentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Comment", "Post"]
        }),
        getAnswers: builder.query<GetCommentsDTO, GetAnswersParams>({
            query: ({ postId, commentId }) => `/${postId}/comments/${commentId}/answers`,
            providesTags: ["Comment"]
        }),
        addAnswer: builder.mutation<void, AddAnswerParams>({
            query: ({ postId, commentId, body }) => ({
                url: `/${postId}/comments/${commentId}/answers`,
                method: "POST",
                body: { body }
            }),
            invalidatesTags: ["Comment"]
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
    useToggleFavoritePostMutation,
    useSearchPostsQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useLazyGetAnswersQuery,
    useAddAnswerMutation
} = postsApi;