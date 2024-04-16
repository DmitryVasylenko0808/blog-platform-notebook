export class GetPostsPaginationParams {
    offset: number;
    limit: number;
};

export class GetPostsQueryParams extends GetPostsPaginationParams {
    type?: "featured" | "popular" | "recently";
    categoryIds?: string;
    authorId?: string;
}