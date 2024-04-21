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

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/posts",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getPosts: builder.query<GetPostsDTO, GetPostsParams>({
            query: ({ limit, offset, type, categoryIds, authorId }) => `/?offset=${offset}&limit=${limit}&type=${type}&categoryIds=${categoryIds ?? ""}&authorId=${authorId ?? ""}`
        }),
        getRelatedPosts: builder.query<GetRelatedPostsDTO, GetRelatedPostsParams>({
            query: ({ id, offset, limit }) => `/${id}/related/?offset=${offset}&limit=${limit}`
        }),
        getPostDetails: builder.query<GetPostDelailsDTO, string>({
            query: (id) => `/${id}/details`
        })
    })
});

export const {
    useGetPostsQuery,
    useGetRelatedPostsQuery,
    useGetPostDetailsQuery
} = postsApi;