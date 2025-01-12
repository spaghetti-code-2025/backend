import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtResDto, UserCredentialsDto } from './user.dto';
import { PrismaService } from '@lib/prisma';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ address }: UserCredentialsDto): Promise<JwtResDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        address,
      },
    });
    if (!user) {
      return this.createUser({ address, secret: address });
    }
    if (user && bcrypt.compareSync(address, user.secret)) {
      return { token: await this.jwtService.sign({ address: user.address }) };
    }
    throw new UnauthorizedException();
  }

  async createUser({
    address,
    secret,
  }: UserCredentialsDto): Promise<JwtResDto> {
    const user = await this.prismaService.user.create({
      data: {
        address,
        secret: await bcrypt.hash(secret, 10),
      },
    });
    return { token: await this.jwtService.sign({ address: user.address }) };
  }
}
