export class GetPostsQueryParams {
    offset: number;
    limit: number;
    type?: "featured" | "popular" | "recently";
    categoryIds?: string;
}