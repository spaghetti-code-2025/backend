import { ApiProperty } from '@nestjs/swagger';
import { Novel } from '@prisma/client';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateNovelReqDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  intro: string;

  @IsString()
  notes: string;

  @IsNumber()
  @IsInt()
  price: number;

  @IsNumber()
  @IsInt()
  length: number;

  @IsString()
  content: string;

  @IsString()
  reviewer_id: string;
}

export class NovelResDto implements Novel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  intro: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  length: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  reviewer_id: string;

  @ApiProperty()
  progress: number;

  @ApiProperty()
  per_chars: number;

  @ApiProperty()
  hash: string;
}
