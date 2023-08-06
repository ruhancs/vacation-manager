import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InputCreateUserDto {
  @ApiProperty({
    description: 'user name should be a not empty string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'job role should be a not empty string',
  })
  @IsString()
  @IsNotEmpty()
  job_role: string;

  @ApiProperty({
    description:
      'recruitment date should be a not empty string, in this format "MM/DD/YYYY"',
  })
  @IsString()
  @IsNotEmpty()
  recruitment_date: string;
}

export class OutputCreateUserDto {
  status: string;
}
