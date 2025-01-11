import { Body, Controller, Get, Post } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelReqDto, NovelResDto } from './novel.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  @ApiCreatedResponse({ type: NovelResDto })
  async createNovel(@Body() data: CreateNovelReqDto): Promise<NovelResDto> {
    return this.novelService.createNovel(data);
  }

  @Get()
  @ApiOkResponse({ type: [NovelResDto] })
  async getNovels(): Promise<NovelResDto[]> {
    return this.novelService.getNovels();
  }
}
