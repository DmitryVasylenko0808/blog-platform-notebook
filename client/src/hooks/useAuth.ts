import { useLazyGetMeQuery } from "../api/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setToken, setUserInfo } from "../redux/slices/authSlice";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);

    const [triggerGetUser] = useLazyGetMeQuery();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!user;

    const setAuthToken = (token: string) => {
        localStorage.setItem("token", token);
        dispatch(setToken(token));
    };

    const authorize = (token: string) => {
        setAuthToken(token);
        triggerGetUser()
            .unwrap()
            .then((res) => dispatch(setUserInfo({ id: res.id, login: res.login })))
            .catch((err) => alert(err.data.message));
    }

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(setUserInfo(null));
        dispatch(setToken(""));
    }

    return {
        user,
        isAuthenticated,
        token,
        setAuthToken,
        authorize,
        logOut
    }
}