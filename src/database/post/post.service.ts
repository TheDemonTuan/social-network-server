import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class DBPostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUnique(params: { where: Prisma.PostWhereUniqueInput; select?: Prisma.PostSelect }) {
    try {
      return await this.prismaService.post.findUnique({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching post", {
        cause: error,
      });
    }
  }

  public async findFirst(params: {
    skip?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    try {
      return await this.prismaService.post.findFirst({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching post", {
        cause: error,
      });
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    include?: Prisma.PostInclude;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prismaService.post.findMany({
        ...params,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching posts", {
        cause: error,
      });
    }
  }

  async insert(data: Prisma.PostCreateInput) {
    try {
      return await this.prismaService.post.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error creating post", {
        cause: error,
      });
    }
  }
}
