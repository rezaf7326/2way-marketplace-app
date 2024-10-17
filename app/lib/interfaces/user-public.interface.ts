import { Role } from '@/app/lib/enums';

export interface UserPublic {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
