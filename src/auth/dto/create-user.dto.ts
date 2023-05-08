import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'somebody@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MySecretPassword' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ example: 'Some Body' })
  @IsString()
  @MinLength(4)
  fullName: string;
}
