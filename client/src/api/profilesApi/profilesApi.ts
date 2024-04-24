import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetProfileDTO } from "./dto/get-profile.dto";

export const profilesApi = createApi({
    reducerPath: "profilesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/profiles",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getProfile: builder.query<GetProfileDTO, string>({
            query: (profileId) => `/${profileId}`
        })
    })
});

export const {
    useGetProfileQuery
} = profilesApi;