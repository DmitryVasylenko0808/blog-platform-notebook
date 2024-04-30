import { Comment } from "@prisma/client";

export type GetCommentsResponse = {
    totalCount: number;
    comments: Comment[];
}