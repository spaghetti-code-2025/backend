import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NovelModule } from './novel/novel.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [NovelModule, UserModule, TaskModule],
  controllers: [AppController],
})
export class AppModule {}
