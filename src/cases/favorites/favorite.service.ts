import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Favorite } from './favorite.entity';
import { Customer } from 'src/cases/customers/customer.entity';

@Injectable()
export class FavoriteService {
 
  update(id: string, favorite: Favorite) {
    throw new Error('Method not implemented.');
  }
  
  delete(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  findAll(customer?: Customer | null): Promise<Favorite[]> {
    if (!customer) {
      return this.repository.find();
    } else {
      return this.repository.find({
        where: { customer: customer },
        relations: ['customer'],
      });
    }
  }

  findById(id: string): Promise<Favorite | null> {
    return this.repository.findOneBy({ id: id });
  }

  save(favorite: Favorite): Promise<Favorite> {
    const total = favorite.items.reduce((sum, item) => {
      return sum + Number(item.quantity) + Number(item.value);
    }, 0);

    favorite.total = total;

    return this.repository.save(favorite);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
