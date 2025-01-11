import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCredentialsDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  secret: string;
}

export class JwtResDto {
  @ApiProperty()
  token: string;
}
