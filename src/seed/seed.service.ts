import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    //Insert Users
    const adminUser = await this.insertUsers();

    //Insert Products
    this.insertProducts(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
    this.productsService.deleteAllProducts();
  }

  private async insertProducts(user: User) {
    const productsToInsert = [];
    const products = initialData.products;

    products.forEach((product) => {
      productsToInsert.push(this.productsService.create(product, user));
    });

    await Promise.all(productsToInsert);
  }

  private async insertUsers() {
    const usersToInsert = [];
    const users = initialData.users;

    users.forEach((user) => {
      usersToInsert.push(this.userRepository.create(user));
    });

    return await this.userRepository.save(usersToInsert)[0];
  }
}
