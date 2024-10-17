import { UserPublic } from './user-public.interface';
import { UserStatus } from '../enums';

export interface User extends UserPublic {
  status: UserStatus;
  phone?: string;
  lastLogin: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}
