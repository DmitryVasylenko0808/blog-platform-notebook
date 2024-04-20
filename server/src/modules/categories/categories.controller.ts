import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    async get(): Promise<Category[]> {
        return await this.categoriesService.get();
    }
}
