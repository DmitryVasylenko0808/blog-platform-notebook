type Author = {
    id: number;
    login: string;
    profile: {
		avatarUrl: string;
	};
};

type Category = {
    id: number;
    title: string;
};

export type Post = {
    id: number;
    title: string;
    description: string;
    body: string;
    imageUrl: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    categoryId: number;
    author: Author;
    category: Category;
};

export type GetPostsDTO = {
    totalCount: number; 
    posts: Post[];
};