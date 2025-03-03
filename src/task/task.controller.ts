import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  GetTaskIdDto,
  TaskResDto,
  UpdateTranslatedTaskDto,
} from './task.dto';
import { UserJwtGuard } from 'src/user/user.guard';
import { GetJwtUser } from 'src/user/user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('task')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOkResponse({ type: TaskResDto, isArray: true })
  async getTasks(): Promise<TaskResDto[]> {
    return this.taskService.getTasks();
  }

  @Get('pending')
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: TaskResDto, isArray: true })
  async getPendingTasks(
    @GetJwtUser() { address }: { address: string },
  ): Promise<TaskResDto[]> {
    return this.taskService.getPendingTasks(address);
  }

  @Post()
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('JWT')
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: TaskResDto })
  async createTask(
    @Body() data: CreateTaskDto,
    @GetJwtUser() { address }: { address: string },
  ): Promise<TaskResDto> {
    return this.taskService.createTask(data, address);
  }

  @Post('translated')
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('JWT')
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse()
  async updateTranslatedTask(
    @Body() data: UpdateTranslatedTaskDto,
    @GetJwtUser() { address }: { address: string },
  ): Promise<void> {
    return this.taskService.updateTranslatedTask(data, address);
  }

  @Post('review')
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Start review task',
    description: 'participant 허가해야지 review가 시작됨.',
  })
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: TaskResDto })
  async startReviewTask(
    @Body() { id }: GetTaskIdDto,
    @GetJwtUser() { address }: { address: string },
  ): Promise<TaskResDto> {
    return this.taskService.startReviewTask(id, address);
  }

  @Post('close')
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Finish task',
    description: 'reviewer가 허가해야지 close가 됨.',
  })
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: TaskResDto })
  async finishTask(
    @Body('id') id: number,
    @GetJwtUser() { address }: { address: string },
  ): Promise<TaskResDto> {
    return this.taskService.finishTask(id, address);
  }
}
