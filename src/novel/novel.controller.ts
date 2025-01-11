import { Body, Controller, Get, Post } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelReqDto, NovelResDto } from './novel.dto';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  async createNovel(@Body() data: CreateNovelReqDto): Promise<NovelResDto> {
    return this.novelService.createNovel(data);
  }

  @Get()
  async getNovels(): Promise<NovelResDto[]> {
    return this.novelService.getNovels();
  }
}
