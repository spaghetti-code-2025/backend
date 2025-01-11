import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NovelModule } from './novel/novel.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [NovelModule, UserModule],
  controllers: [AppController, UserController],
  providers: [UserService],
})
export class AppModule {}
