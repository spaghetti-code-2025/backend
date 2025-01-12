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

  async getPendingTasks(address: string): Promise<Task[]> {
    return this.prismaService.task.findMany({
      where: {
        novel: {
          reviewer_address: address,
        },
        status: Status.PENDING,
      },
    });
  }

  async createTask(
    { length, start, end, novel_id }: CreateTaskDto,
    address: string,
  ): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        novel_id,
        participantAddress: address,
        length,
        start,
        end,
        translated: '',
        trans_hash: '',
        status: Status.IN_PROGRESS,
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

  async startReviewTask(id: number, address: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        novel: true,
      },
    });
    if (task.participantAddress !== address) {
      throw new UnauthorizedException();
    }
    return await this.prismaService.task.update({
      where: { id },
      data: {
        status: Status.PENDING,
      },
    });
  }

  async finishTask(id: number, address: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        novel: true,
      },
    });
    if (task.novel.reviewer_address !== address) {
      throw new UnauthorizedException();
    }

    const result = await this.prismaService.task.update({
      where: { id },
      data: {
        status: Status.DONE,
        trans_hash: createHash('sha256')
          .update(task.translated)
          .digest('base64'),
      },
    });

    const totalTasks = await this.prismaService.task.count({
      where: {
        novel_id: task.novel_id,
      },
    });
    const completedTasks = await this.prismaService.task.count({
      where: {
        novel_id: task.novel_id,
        status: Status.DONE,
      },
    });
    await this.prismaService.novel.update({
      where: { id: task.novel_id },
      data: {
        progress: (completedTasks / totalTasks) * 100,
      },
    });

    return result;
  }
}
