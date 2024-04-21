import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetPostsDTO } from "./dto/get-posts.dto";
import { GetPostDelailsDTO } from "./dto/get-post-details.dto";

type GetPostsParams = {
    offset: number;
    limit: number;
    type?: "featured" | "popular" | "recently";
    categoryIds?: string;
    authorId?: string;
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
        getPostDetails: builder.query<GetPostDelailsDTO, string>({
            query: (id) => `/${id}/details`
        })
    })
});

export const {
    useGetPostsQuery,
    useGetPostDetailsQuery
} = postsApi;