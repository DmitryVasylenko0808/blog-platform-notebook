import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserInfo } from "../redux/slices/authSlice";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);

    const isAuthenticated = !!user;
    const token = localStorage.getItem("token");

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(setUserInfo(null));
    }

    console.log(isAuthenticated);

    return {
        user,
        isAuthenticated,
        token,
        setToken,
        logOut
    }
}