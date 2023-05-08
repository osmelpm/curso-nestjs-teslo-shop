import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import configEnv from './config/configuration';
import { envSchema } from './config/env-schema';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FileModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configEnv],
      validationSchema: envSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        ssl: ConfigService.get('stage') === 'prod',
        type: 'postgres',
        host: ConfigService.get('db_host'),
        port: ConfigService.get('db_port'),
        username: ConfigService.get('db_user'),
        password: ConfigService.get('db_password'),
        database: ConfigService.get('db_name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FileModule,

    AuthModule,

    MessagesWsModule,
  ],
})
export class AppModule {}
