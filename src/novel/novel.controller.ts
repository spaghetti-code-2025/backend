import { Body, Controller, Get, Post } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelReqDto } from './novel.dto';
import { Novel } from '@prisma/client';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  async createNovel(@Body() data: CreateNovelReqDto): Promise<Novel> {
    return this.novelService.createNovel(data);
  }

  @Get()
  async getNovels(): Promise<Novel[]> {
    return this.novelService.getNovels();
  }
}
