import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtResDto, UserCredentialsDto } from './user.dto';
import { ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: JwtResDto })
  async login(@Body() data: UserCredentialsDto): Promise<JwtResDto> {
    return this.userService.login(data);
  }
}
