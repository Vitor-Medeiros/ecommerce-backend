import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { validate as isUUID } from 'uuid';
import { CustomerService } from 'src/cases/customers/customer.service';

@Controller('favorites')
export class FavoriteController {
  constructor(
    private readonly service: FavoriteService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async find(@Query('customerId') customerId: string): Promise<Favorite[]> {
    if (customerId && isUUID(customerId)) {
      const customer = await this.customerService.findById(customerId);
      return this.service.findAll(customer);
    }
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Favorite> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException(
        `Favorite with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return found;
  }

  @Post()
  create(@Body() Favorite: Favorite): Promise<Favorite> {
    return this.service.save(Favorite);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    favorite: Favorite,
  ): Promise<Favorite> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException(`Favorite not found`, HttpStatus.NOT_FOUND);
    }

    favorite.id = id;

    return this.service.save(favorite);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException(`Favorite not found`, HttpStatus.NOT_FOUND);
    }
    return this.service.remove(id);
  }
}
