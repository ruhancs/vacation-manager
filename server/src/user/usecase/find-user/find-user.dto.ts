import CreateVacationDto from '../register-vacation/register-vacation.dto';

export default class OutputFindUserDto {
  name: string;
  job_role: string;
  recruitment_date: string;
  vacations: CreateVacationDto[];
}
