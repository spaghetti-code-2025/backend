import { ApiProperty } from '@nestjs/swagger';
import { Novel } from '@prisma/client';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateNovelReqDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  intro: string;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  length: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  separator: number[];

  @ApiProperty()
  @IsString()
  reviewer_address: string;
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
  image_url: string;

  @ApiProperty()
  separator: number[];

  @ApiProperty()
  reviewer_address: string;

  @ApiProperty()
  progress: number;

  @ApiProperty()
  per_chars: number;

  @ApiProperty()
  hash: string;
}

export class UploadImageDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  url: string;
}
