import { AVATARS_URL, NULL_AVATAR_URL, POSTS_IMAGES_URL } from "../constants/api";

export const useImage = (type: "avatar" | "post", url?: string) => {
    if (!url) {
        if (type === "avatar") {
            return NULL_AVATAR_URL;
        } else {
            return "";
        }
    }

    if (type === "avatar") {
        return AVATARS_URL + url;
    } else {
        return POSTS_IMAGES_URL + url;
    }
}