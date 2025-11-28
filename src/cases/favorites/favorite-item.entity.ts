import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Favorite } from './favorite.entity';


@Entity('favorite-item')
export class FavoriteItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Favorite)
  favorite: Favorite;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  product: Product;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;
}
