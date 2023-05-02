import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.productsService.deleteAllProducts();

    const productsToInsert = [];
    const products = initialData.products;

    products.forEach((product) => {
      productsToInsert.push(this.productsService.create(product));
    });

    await Promise.all(productsToInsert);

    return 'SEED EXECUTED';
  }
}
