import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NovelModule } from './novel/novel.module';

@Module({
  imports: [NovelModule],
  controllers: [AppController],
})
export class AppModule {}
