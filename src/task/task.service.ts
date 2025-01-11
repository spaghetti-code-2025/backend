import { PrismaService } from '@lib/prisma';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask({ length, start, end }: CreateTaskDto): Promise<void> {
    await this.prismaService.task.create({
      data: {
        length,
        start,
        end,
        translated: '',
        trans_hash: '',
      },
    });
  }
}
