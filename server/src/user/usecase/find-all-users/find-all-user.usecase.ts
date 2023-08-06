import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import UserRepository from 'src/user/repository/user.repository';

@Injectable()
export default class FindAllUserUseCase {
  constructor(private readonly userReepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userReepository.findAll();

    return users;
  }
}
