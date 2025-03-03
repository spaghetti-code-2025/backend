import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    super({
      datasourceUrl: configService.get<string>('DATABASE_URL'),
    });
  }

  onModuleInit() {
    this.$connect();
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
