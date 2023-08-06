import { Vacation } from '@prisma/client';

export class VacationEntity implements Vacation {
  id: number;
  start_date: string;
  end_date: string;
  user_id: number;
}
