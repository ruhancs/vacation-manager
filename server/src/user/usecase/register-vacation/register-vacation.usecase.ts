import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import OutputFindUserDto from 'src/user/usecase/find-user/find-user.dto';
import CreateVacationDto from 'src/user/usecase/register-vacation/register-vacation.dto';
import UserRepository from 'src/user/repository/user.repository';

@Injectable()
export default class RegisterVacationUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number, createVacationDto: CreateVacationDto) {
    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new NotFoundException('user with this id not found');
    }

    this.validateDateFormat(
      createVacationDto.start_date,
      createVacationDto.end_date,
    );

    this.checkUserOneYearOfWork(user, createVacationDto.start_date);

    const totalRequiredDays = this.getDaysOfDiference(
      createVacationDto.start_date,
      createVacationDto.end_date,
    );

    this.checkMinVacationDays(totalRequiredDays);

    this.verifyVacationDays(user, createVacationDto);

    const userRegisteredVacation = this.getUserDaysRegisteredVacation(user);

    const dayLeftUserVacation = this.checkDaysLeftVacation(
      user,
      userRegisteredVacation,
      totalRequiredDays,
    );

    this.checkTimesUserWentVacation(
      user,
      totalRequiredDays,
      dayLeftUserVacation,
    );

    this.validateVacation14DaysOrMore(
      totalRequiredDays,
      dayLeftUserVacation,
      userRegisteredVacation,
    );

    return this.userRepository.registerVacation(userId, createVacationDto);
  }

  private validateDateFormat(date1: string, date2: string) {
    const checkdate1 = new Date(date1);
    const checkDate2 = new Date(date2);

    if (isNaN(checkdate1.getTime()) || isNaN(checkDate2.getTime())) {
      throw new BadRequestException(
        'Invalid date format, format should be MM/DD/YYYY',
      );
    }
  }

  private checkUserOneYearOfWork(user: OutputFindUserDto, startDate: string) {
    const daysDiference = this.getDaysOfDiference(
      user.recruitment_date,
      startDate,
    );

    if (daysDiference < 360) {
      throw new BadRequestException('user has no vacation');
    }
    return;
  }

  private checkMinVacationDays(totalRequiredDays: number) {
    if (totalRequiredDays < 5) {
      throw new BadRequestException(
        'the min amount of vacation days is 5 days',
      );
    }
    return;
  }

  private checkTimesUserWentVacation(
    user: OutputFindUserDto,
    totalRequiredDays: number,
    daysLeftVacation: number,
  ) {
    if (user.vacations.length === 2 && totalRequiredDays < daysLeftVacation) {
      throw new BadRequestException(
        `the user's vacation must be ${daysLeftVacation} days`,
      );
    }
    return;
  }

  private checkDaysLeftVacation(
    user: OutputFindUserDto,
    userRegisteredVacation: number[],
    totalRequiredDays: number,
  ) {
    let vacationDays = 30;
    vacationDays -= totalRequiredDays;
    if (user.vacations.length === 0 && totalRequiredDays <= vacationDays) {
      vacationDays += totalRequiredDays;
      return vacationDays;
    }
    const userVacation = userRegisteredVacation;
    userVacation.forEach((days) => {
      vacationDays -= days;
    });
    if (vacationDays < 0) {
      throw new BadRequestException(
        `user does not have this quantity of vacation days`,
      );
    }
    vacationDays += totalRequiredDays;
    return vacationDays;
  }

  private getDaysOfDiference(startDate: string, endDate: string): number {
    const start_date: any = new Date(startDate);
    const end_date: any = new Date(endDate);
    const daysInMs = Math.abs(end_date - start_date);
    const totalDays = Math.ceil(daysInMs / (1000 * 60 * 60 * 24));
    return totalDays;
  }

  private validateVacation14DaysOrMore(
    totalRequiredDays: number,
    dayLeftUserVacation: number,
    userRegisteredVacation: number[],
  ) {
    let have14Days = false;
    if (totalRequiredDays >= 14) {
      have14Days = true;
      return;
    } else {
      userRegisteredVacation.forEach((days) => {
        if (days >= 14) {
          have14Days = true;
          return;
        }
      });
    }
    if (!have14Days) {
      if (dayLeftUserVacation - totalRequiredDays < 14) {
        throw new BadRequestException(
          `this user s vacation days must be 14 days or more`,
        );
      }
    }
    return;
  }

  private getUserDaysRegisteredVacation(user: OutputFindUserDto) {
    const userVacation = user.vacations.map((v) => {
      const totalDays = this.getDaysOfDiference(v.start_date, v.end_date);
      return totalDays;
    });
    return userVacation;
  }

  private verifyVacationDays(
    user: OutputFindUserDto,
    createVacationDto: CreateVacationDto,
  ) {
    user.vacations.forEach((v) => {
      const vacationStart = new Date(v.start_date).getTime();
      const vacationEnd = new Date(v.end_date).getTime();
      if (
        (new Date(createVacationDto.start_date).getTime() >= vacationStart &&
          new Date(createVacationDto.start_date).getTime() < vacationEnd) ||
        (new Date(createVacationDto.end_date).getTime() >= vacationStart &&
          new Date(createVacationDto.end_date).getTime() < vacationEnd)
      ) {
        throw new BadRequestException(
          'the user already registered vacation in this period',
        );
      }
    });
  }
}
