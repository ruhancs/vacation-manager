import { UserEntity } from 'src/user/domain/entities/user.entity';
import { InputCreateUserDto } from '../usecase/create-user/create-user.dto';

export default interface UserGateway {
  create(user: InputCreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  find(id: number): Promise<UserEntity>;
}
