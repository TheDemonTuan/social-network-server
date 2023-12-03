import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUnique(params: { where: Prisma.UserWhereUniqueInput; select?: Prisma.UserSelect }) {
    try {
      return await this.prismaService.user.findUnique({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching user", {
        cause: error,
      });
    }
  }

  public async findFirst(params: {
    skip?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    try {
      return await this.prismaService.user.findFirst({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching user", {
        cause: error,
      });
    }
  }

  async insert(data: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.user.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error creating user", {
        cause: error,
      });
    }
  }
}
