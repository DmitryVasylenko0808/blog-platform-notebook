import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetProfileDTO } from "./dto/get-profile.dto";
import { API_URL_PROFILES } from "../../constants/api";

type EditProfileParams = {
    firstName: string;
    secondName: string;
    description: string;
    avatarFile?: File;
}

export const profilesApi = createApi({
    reducerPath: "profilesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_PROFILES,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Profiles"],
    endpoints: builder => ({
        getProfile: builder.query<GetProfileDTO, string>({
            query: (profileId) => `/${profileId}`,
            providesTags: ["Profiles"]
        }),
        editProfile: builder.mutation<void, EditProfileParams>({
            query: (body) => {
                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value));

                return {
                    url: "/",
                    method: "PATCH",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Profiles"]
        })
    })
});

export const {
    useGetProfileQuery,
    useLazyGetProfileQuery,
    useEditProfileMutation
} = profilesApi;