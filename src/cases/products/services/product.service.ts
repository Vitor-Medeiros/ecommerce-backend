import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../../categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  findAll(category?: Category): Promise<Product[]> {
    if (!category) return this.repository.find({ relations: ['category', 'brand', 'photos'] });
    return this.repository.find({
      where: { category },
      relations: ['category', 'brand', 'photos'],
    });
  }

  findById(id: string): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category', 'brand', 'photos'],
    });
  }


  findByIds(ids: string[]): Promise<Product[]> {
    return this.repository.find({
      where: { id: In(ids) },
      relations: ['category', 'brand', 'photos'],
    });
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
