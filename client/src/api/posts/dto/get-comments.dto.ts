type Profile = {
    firstName: string;
    secondName: string;
    avatarUrl: string;
};

type Author = {
    id: number;
    login: string;
    profile: Profile;
};

export type Comment = {
    id: number;
    body: string;
    authorId: number;
    postId: number;
    parentId: number | null;
    author: Author,
    _count: {
        children: number;
    }
};

export type GetCommentsDTO = {
    totalCount: number;
    comments: Comment[];
};