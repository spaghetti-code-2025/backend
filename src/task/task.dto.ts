import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  length: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  start: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  end: number;
}
