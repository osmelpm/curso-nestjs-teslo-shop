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
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({
    example: 'Scribble T Logo Onesie',
  })
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({
    example: 200,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Product description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'scribble_t_logo_onesie',
    required: false,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 50,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['XS', 'S'],
  })
  @IsString({
    each: true,
  })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    example: ['shirt'],
  })
  @IsString({
    each: true,
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    example: ['8529387-00-A_1.jpg', '8529387-00-A_0_2000.jpg'],
    required: false,
  })
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ example: 'kid' })
  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
