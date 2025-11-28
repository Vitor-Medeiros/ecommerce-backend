import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteItem } from './favorite-item.entity';
import { CustomerModule } from 'src/cases/customers/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, FavoriteItem]), CustomerModule],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
