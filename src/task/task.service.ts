import { PrismaService } from '@lib/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto, UpdateTranslatedTaskDto } from './task.dto';
import { Status, Task } from '@prisma/client';
import { createHash } from 'crypto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async createTask(
    { length, start, end }: CreateTaskDto,
    address: string,
  ): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        participantAddress: address,
        length,
        start,
        end,
        translated: '',
        trans_hash: '',
      },
    });
  }

  async updateTranslatedTask(
    { id, translated }: UpdateTranslatedTaskDto,
    address: string,
  ): Promise<void> {
    await this.prismaService.task
      .update({
        where: { id, participantAddress: address },
        data: { translated, status: Status.IN_PROGRESS },
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  async finishTask(id: number, address: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        novel: true,
      },
    });
    if (task.novel.reviewer_id !== address) {
      throw new UnauthorizedException();
    }
    return await this.prismaService.task.update({
      where: { id },
      data: {
        status: Status.DONE,
        trans_hash: createHash('sha256')
          .update(task.translated)
          .digest('base64'),
      },
    });
  }
}
