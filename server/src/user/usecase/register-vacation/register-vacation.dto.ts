import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateVacationDto {
  @ApiProperty({
    description:
      'start_date of the vacation, should be in this format MM/DD/YYYY',
  })
  @IsString()
  start_date: string;

  @ApiProperty({
    description:
      'end_date of the vacation, should be in this format MM/DD/YYYY',
  })
  @IsString()
  end_date: string;
}
