import { Post } from '@prisma/client';

export type GetPostsResponse =  {
    totalCount: number;
    posts: Omit<Post, "body">[];
}