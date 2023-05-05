import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create({ password, ...userProps }: CreateUserDto) {
    const user = this.userRepository.create({
      ...userProps,
      password: bcrypt.hashSync(password, 10),
    });

    try {
      await this.userRepository.save(user);
      delete user.password;
      return {
        user,
        token: this.generateJWT({ userId: user.id }),
      };
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async login({ email, password }: LoginUserDto) {
    // const user = await this.userRepository.findOneBy({ email }) // receive all user properties
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        password: true,
        roles: true,
        id: true,
      },
    }); // receive just the selected properties

    if (!user) {
      throw new UnauthorizedException(`User is not valid`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Password is not valid`);
    }

    delete user.password;

    return {
      user,
      token: this.generateJWT({ userId: user.id }),
    };
  }

  checkAuthStatus(user: User) {
    delete user.isActive;
    delete user.roles;
    return {
      user,
      token: this.generateJWT({ userId: user.id }),
    };
  }

  private generateJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDbExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check the server logs');
  }
}
