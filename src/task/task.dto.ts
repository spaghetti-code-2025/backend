import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Task } from '@prisma/client';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  novel_id: number;

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

export class GetTaskIdDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: number;
}

export class UpdateTranslatedTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  translated: string;
}

export class TaskResDto implements Task {
  @ApiProperty()
  length: number;

  @ApiProperty()
  start: number;

  @ApiProperty()
  end: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  translated: string;

  @ApiProperty()
  status: $Enums.Status;

  @ApiProperty()
  trans_hash: string;

  @ApiProperty()
  participantAddress: string;

  @ApiProperty()
  novel_id: number;
}
