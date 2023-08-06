import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InputCreateUserDto } from '../usecase/create-user/create-user.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { VacationEntity } from '../domain/entities/vacation.entity';
import CreateVacationDto from '../usecase/register-vacation/register-vacation.dto';
import OutputFindUserDto from '../usecase/find-user/find-user.dto';

@Injectable()
export default class UserRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async create(createUserDto: InputCreateUserDto): Promise<UserEntity> {
    return this.dbContext.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.dbContext.user.findMany();
  }

  async find(id: number): Promise<OutputFindUserDto> {
    const user = await this.dbContext.user.findUnique({
      where: { id: id },
      include: {
        vacations: {
          select: {
            start_date: true,
            end_date: true,
          },
        },
      },
    });
    const output: OutputFindUserDto = {
      name: user.name,
      job_role: user.job_role,
      recruitment_date: user.recruitment_date,
      vacations: user.vacations,
    };
    return output;
  }

  async registerVacation(
    userId: number,
    vacationDto: CreateVacationDto,
  ): Promise<VacationEntity> {
    const vacation = await this.dbContext.vacation.create({
      data: {
        start_date: vacationDto.start_date,
        end_date: vacationDto.end_date,
        user_id: userId,
      },
    });

    return vacation;
  }
}
