import { PrismaModule } from '@lib/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';

@Module({
  imports: [PrismaModule],
  providers: [NovelService],
  controllers: [NovelController],
})
export class NovelModule {}
