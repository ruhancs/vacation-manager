import { Injectable, NotFoundException } from '@nestjs/common';
import OutputFindUserDto from 'src/user/usecase/find-user/find-user.dto';
import UserRepository from 'src/user/repository/user.repository';

@Injectable()
export default class FindUserUseCase {
  constructor(private readonly userReepository: UserRepository) {}

  async execute(userId: number): Promise<OutputFindUserDto> {
    const user = await this.userReepository.find(userId);

    if (!user) {
      throw new NotFoundException('user with this id not found');
    }

    return user;
  }
}
