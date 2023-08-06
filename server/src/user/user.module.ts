import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from './repository/prisma/prisma.service';
import UserRepository from './repository/user.repository';
import RegisterVacationUseCase from './usecase/register-vacation/register-vacation.usecase';
import CreateUserUseCase from './usecase/create-user/create-user.usecase';
import FindAllUserUseCase from './usecase/find-all-users/find-all-user.usecase';
import FindUserUseCase from './usecase/find-user/find-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindUserUseCase,
    RegisterVacationUseCase,
    PrismaService,
    UserRepository,
  ],
})
export class UserModule {}
