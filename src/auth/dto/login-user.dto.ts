import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'somebody@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MySecretPassword' })
  @IsString()
  @MinLength(4)
  password: string;
}
