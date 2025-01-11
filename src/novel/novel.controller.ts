import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelReqDto, NovelResDto, UploadImageDto } from './novel.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('novel')
@UsePipes(new ValidationPipe())
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  @ApiCreatedResponse({ type: NovelResDto })
  async createNovel(@Body() data: CreateNovelReqDto): Promise<NovelResDto> {
    return this.novelService.createNovel(data);
  }

  @Post('thumbnail')
  @ApiCreatedResponse({ type: NovelResDto })
  async updateUrl(@Body() data: UploadImageDto): Promise<NovelResDto> {
    return this.novelService.updateUrl(data);
  }

  @Get()
  @ApiOkResponse({ type: [NovelResDto] })
  async getNovels(): Promise<NovelResDto[]> {
    return this.novelService.getNovels();
  }
}
