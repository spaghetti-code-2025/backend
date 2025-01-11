import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtResDto, UserCredentialsDto } from './user.dto';
import { PrismaService } from '@lib/prisma';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ address, secret }: UserCredentialsDto): Promise<JwtResDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        address,
      },
    });
    if (!user) {
      return this.createUser({ address, secret });
    }
    if (user && bcrypt.compareSync(secret, user.secret)) {
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
        secret: bcrypt.hashSync(secret, 10),
      },
    });
    return { token: await this.jwtService.sign({ address: user.address }) };
  }
}
