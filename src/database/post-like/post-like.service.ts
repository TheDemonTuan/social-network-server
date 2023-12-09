import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class DBPostLikeService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUnique(params: { where: Prisma.PostLikeWhereUniqueInput; select?: Prisma.PostLikeSelect }) {
    try {
      return await this.prismaService.postLike.findUnique({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching like post", {
        cause: error,
      });
    }
  }

  public async findFirst(params: {
    skip?: number;
    cursor?: Prisma.PostLikeWhereUniqueInput;
    where?: Prisma.PostLikeWhereInput;
    orderBy?: Prisma.PostLikeOrderByWithRelationInput;
  }) {
    try {
      return await this.prismaService.postLike.findFirst({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching like post", {
        cause: error,
      });
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostLikeWhereUniqueInput;
    include?: Prisma.PostLikeInclude;
    where?: Prisma.PostLikeWhereInput;
    orderBy?: Prisma.PostLikeOrderByWithRelationInput;
  }) {
    try {
      return await this.prismaService.postLike.findMany({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching likes post", {
        cause: error,
      });
    }
  }

  async insert(data: Prisma.PostLikeCreateInput) {
    try {
      return await this.prismaService.postLike.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error like post", {
        cause: error,
      });
    }
  }

  async delete(where: Prisma.PostLikeWhereUniqueInput) {
    try {
      return await this.prismaService.postLike.delete({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error unlike post", {
        cause: error,
      });
    }
  }

  async count(params: {
    where?: Prisma.PostLikeWhereInput;
    orderBy?: Prisma.PostLikeOrderByWithRelationInput;
    cursor?: Prisma.PostLikeWhereUniqueInput;
    take?: number;
    skip?: number;
  }) {
    try {
      return await this.prismaService.postLike.count({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error count like post", {
        cause: error,
      });
    }
  }
}
