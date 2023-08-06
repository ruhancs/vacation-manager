import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InputCreateUserDto } from './usecase/create-user/create-user.dto';
import CreateVacationDto from './usecase/register-vacation/register-vacation.dto';
import RegisterVacationUseCase from './usecase/register-vacation/register-vacation.usecase';
import CreateUserUseCase from './usecase/create-user/create-user.usecase';
import FindAllUserUseCase from './usecase/find-all-users/find-all-user.usecase';
import FindUserUseCase from './usecase/find-user/find-user.usecase';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUseUseCase: FindAllUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private registerVacationUseCase: RegisterVacationUseCase,
  ) {}

  @ApiBadRequestResponse({
    description: 'Bad request, recruitement_date format: MM/DD/YYYY',
  })
  @Post()
  create(@Body() createUserDto: InputCreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUseUseCase.execute();
  }

  @ApiNotFoundResponse({ description: 'User not found, check id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserUseCase.execute(+id);
  }

  @ApiBadRequestResponse({
    description:
      'format of the date invalid, or invalid business rule, date format: MM/DD/YYYY',
  })
  @ApiNotFoundResponse({ description: 'User not found, check id' })
  @Post('register_vacation/:userId')
  async registerVacation(
    @Param('userId') userId: string,
    @Body() createVacationDto: CreateVacationDto,
  ) {
    return this.registerVacationUseCase.execute(+userId, createVacationDto);
  }
}
