import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>
    ){}

    findAll(): Promise<Category[]> {
        return this.repository.find();  
    }

<<<<<<< HEAD
    findById(id: string): Promise<Category | null> {
=======
    findById(id: string): Promise<Category> {
>>>>>>> fa1fbda2a0c29c13ea0f7a773fd733470a91b7f2
        return this.repository.findOneBy({id:id});
    }

    save(category: Category): Promise<Category> {
        return this.repository.save(category);
    }

    async remove(id:string): Promise<void> {
        await this.repository.delete(id);
    }
}