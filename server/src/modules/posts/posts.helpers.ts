import { Post } from "@prisma/client";
import { GetPostsQueryParams } from "./dto/get.posts.query.params";

export const buildFilter = (filterParams: Omit<GetPostsQueryParams, "limit" | "offset">) => {
    const { type, categoryIds, authorId } = filterParams;

    let filter: any = {};

    if (type === "popular") {
        filter = {
            orderBy: {
                viewsCount: "desc"
            }
        }
    } else if (type === "recently") {
        filter = {
            orderBy: {
                createdAt: "desc"
            }
        }
    } else if (type === "featured") {
        const currentDate = new Date();
        const dateStart = new Date(currentDate.getFullYear(), currentDate.getMonth());
        const dateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

        filter = {
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd
                }
            }
        }
    }

    if (categoryIds) {
        const categoryIdsArray = categoryIds.split(",").map(item => parseInt(item));
        filter = {
            ...filter,
            where: {
                ...filter.where,
                categoryId: { in: categoryIdsArray }
            }
        }
    };

    if (authorId) {
        filter = {
            ...filter,
            where: {
                ...filter.where,
                authorId: Number(authorId)
            }
        }
    }

    return filter;
}

export const excludePostBody = (posts: Post[]) => {
    const res = posts.map(item => {
        let p: Omit<Post, "body"> = {} as Omit<Post, "body">;
        for(const key of Object.keys(item)) {
            if (key === "body") {
                continue;
            }

            p[key] = item[key];
        }

        return p;
    });

    return res;
}