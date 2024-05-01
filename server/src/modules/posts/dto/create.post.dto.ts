export class CreatePostDto {
    title: string;
    description: string;
    body: string;
    categoryId: number;
    imageFile?: string;
}