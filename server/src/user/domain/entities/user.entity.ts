import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  job_role: string;
  recruitment_date: string;
}
