import { Post } from '@prisma/client';

export type GetPostsResponse =  {
    totalCount: number;
    posts: Omit<Post, "body">[];
};

export type GetOnePostResponse = Post & { 
    likers: { 
        userId: number 
    }[] 
};