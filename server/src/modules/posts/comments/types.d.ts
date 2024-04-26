import { Comment } from "@prisma/client";

export type GetCommentsResponse = {
    totalCount: number;
    comments: Comment[];
}

export type GetAnswersResponse = {
    totalCount: number;
    answers: Comment[];
}