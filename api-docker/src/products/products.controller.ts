import { Controller, Delete, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() product: ProductsDto) {
    return await this.productsService.create(product);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.findAll();
  }
 
  @Patch(':id')
  async editProduct(@Param('id') id: string, @Body() product: ProductsDto) {
    return await this.productsService.edit(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}