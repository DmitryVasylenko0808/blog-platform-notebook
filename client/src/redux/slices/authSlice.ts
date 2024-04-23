import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
    id: number;
    login: string;
};

type AuthState = {
    user: User | null;
    token: string;
};

const initialState: AuthState = {
    user: null,
    token: ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
});

export const { setUserInfo, setToken } = authSlice.actions;
export default authSlice.reducer;