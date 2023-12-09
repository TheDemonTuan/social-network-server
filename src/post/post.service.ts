import { DBPostService } from "@/database/post/post.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PostDto } from "./dtos/post.dto";
import { DBUserService } from "@/database/user/user.service";
import { PostLikeDto } from "./dtos/post-like.dto";
import { DBPostLikeService } from "@/database/post-like/post-like.service";

@Injectable()
export class PostService {
  constructor(
    private readonly dbPostService: DBPostService,
    private readonly dbUserService: DBUserService,
    private readonly dbPostLikeService: DBPostLikeService
  ) {}

  public async getPosts(userId: string) {
    return this.dbPostService.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        user: true,
        post_likes: {
          where: {
            user_id: userId,
          },
        },
        _count: {
          select: {
            post_likes: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  public async createPost(body: PostDto, userID: string) {
    return this.dbPostService.insert({
      content: body.content,
      user: {
        connect: {
          id: userID,
        },
      },
    });
  }

  public async getLikePosts(postID: number) {
    return this.dbPostLikeService.count({
      where: {
        post_id: postID,
      },
    });
  }

  public async putLikePost(postID: number, userId: string) {
    const post = await this.dbPostService.findUnique({ where: { id: postID } });
    if (!post) throw new BadRequestException("Post not found");

    const isLikedPost = await this.dbPostLikeService.findFirst({
      where: {
        post_id: post?.id,
        user_id: userId,
      },
    });

    if (isLikedPost) {
      await this.dbPostLikeService.delete({
        post_id_user_id: {
          post_id: post?.id,
          user_id: userId,
        },
      });
    } else {
      await this.dbPostLikeService.insert({
        post: {
          connect: {
            id: post?.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      });
    }

    return {
      post_id: post?.id,
      post_likes: await this.dbPostLikeService.count({
        where: {
          post_id: post?.id,
        },
      }),
    };
  }
}
