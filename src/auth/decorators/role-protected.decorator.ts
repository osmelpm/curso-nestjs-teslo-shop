import { SetMetadata } from '@nestjs/common';
import { Roles } from '../interfaces/roles.interface';

const META_ROLE = 'roles';

export const RoleProtected = (...roles: Roles[]) =>
  SetMetadata(META_ROLE, roles);
