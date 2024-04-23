import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SignInDTO } from "./dto/sign-in.dto";
import { GetMeDTO } from "./dto/get-me.dto";

type SignInParams = {
    login: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/auth",
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getMe: builder.query<GetMeDTO, void>({
            query: () => "/me"
        }),
        signIn: builder.mutation<SignInDTO, SignInParams>({
            query: body => ({
                url: "/sign-in",
                method: "POST",
                body
            })
        })
    }),
    tagTypes: ["UNATHORIZED"]
});

export const {
    useLazyGetMeQuery,
    useSignInMutation
} = authApi;