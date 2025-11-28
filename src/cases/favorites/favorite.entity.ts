import { Customer } from 'src/cases/customers/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FavoriteItem } from './favorite-item.entity';

enum FavoriteStatus {
  NEW = 'NEW',
  SEPARATION = 'SEPARATION',
  INVOICED = 'INVOICED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@Entity('orders')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, { nullable: false, eager: true })
  customer: Customer;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  shipping: number;

  @Column('enum', { enum: FavoriteStatus, default: FavoriteStatus.NEW })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @OneToMany(() => FavoriteItem, (item) => item.favorite, {
    eager: true,
    cascade: true,
  })
  items: FavoriteItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
