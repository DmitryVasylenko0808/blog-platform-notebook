import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetCategoriesDTO } from "../categories/dto/get-categories.dto";
import { API_URL_CATEGORIES } from "../../constants/api";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_CATEGORIES,
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