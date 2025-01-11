import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NovelModule } from './novel/novel.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [NovelModule, UserModule, TaskModule],
  controllers: [AppController, UserController],
  providers: [UserService],
})
export class AppModule {}
