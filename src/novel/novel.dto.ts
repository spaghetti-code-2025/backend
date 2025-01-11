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
