import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetCategoriesDTO } from "../categories/dto/get-categories.dto";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/categories",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getCategories: builder.query<GetCategoriesDTO, void>({
            query: () => "/"
        })
    })
});

export const {
    useGetCategoriesQuery
} = categoriesApi;