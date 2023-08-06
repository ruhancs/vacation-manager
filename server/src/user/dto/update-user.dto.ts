import { PartialType } from '@nestjs/mapped-types';
import { InputCreateUserDto } from '../usecase/create-user/create-user.dto';

export class UpdateUserDto extends PartialType(InputCreateUserDto) {}
