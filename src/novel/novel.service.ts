import { PrismaService } from '@lib/prisma';
import { Injectable } from '@nestjs/common';
import { CreateNovelReqDto } from './novel.dto';
import { createHash } from 'crypto';
import { Novel } from '@prisma/client';

@Injectable()
export class NovelService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNovel({
    title,
    author,
    intro,
    notes,
    price,
    length,
    content,
    reviewer_id,
  }: CreateNovelReqDto): Promise<Novel> {
    return this.prismaService.novel.create({
      data: {
        title,
        author,
        intro,
        notes,
        content,
        progress: 0,
        per_chars: price / length,
        price,
        length,
        hash: createHash('sha256').update(content).digest('base64'),
        reviewer_id,
      },
    });
  }

  async getNovels(): Promise<Novel[]> {
    return this.prismaService.novel.findMany();
  }
}
