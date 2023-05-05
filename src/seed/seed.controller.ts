import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/interfaces/roles.interface';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  //@Auth(Roles.ADMIN)
  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
