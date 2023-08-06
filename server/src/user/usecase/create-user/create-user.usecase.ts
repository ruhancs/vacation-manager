import { BadRequestException, Injectable } from '@nestjs/common';
import {
  InputCreateUserDto,
  OutputCreateUserDto,
} from 'src/user/usecase/create-user/create-user.dto';
import UserRepository from 'src/user/repository/user.repository';

@Injectable()
export default class CreateUserUseCase {
  constructor(private readonly userReepository: UserRepository) {}

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    this.validateDateFormat(input.recruitment_date);
    await this.userReepository.create(input);

    const output: OutputCreateUserDto = {
      status: 'success',
    };

    return output;
  }

  private validateDateFormat(date: string) {
    const checkdate1 = new Date(date);

    if (isNaN(checkdate1.getTime())) {
      throw new BadRequestException(
        'Invalid date format, format should be MM/DD/YYYY',
      );
    }
  }
}
