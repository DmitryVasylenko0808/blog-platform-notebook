import { Comment } from "@prisma/client";

export const buildCommentsTree = (comments: Comment[], parentId?: number) => {
    parentId = parentId ?? comments[0].parentId;

    return comments
        .filter(c => c.parentId === parentId)
        .map(child => ({ ...child, children: buildCommentsTree(comments, child.id) }))
        .sort((a, b) => a.id - b.id);
}