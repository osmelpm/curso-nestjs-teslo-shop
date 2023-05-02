import {
  IsString,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
} from 'class-validator';
import { ProductImage } from '../entities';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({
    each: true,
  })
  @IsArray()
  sizes: string[];

  @IsString({
    each: true,
  })
  @IsArray()
  tags: string[];

  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
