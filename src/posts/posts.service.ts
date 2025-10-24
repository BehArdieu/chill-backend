import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    community_id?: string,
    event_id?: string,
    author_id?: string,
    limit: number = 20,
    offset: number = 0,
  ) {
    const where: any = {
      is_public: true,
    };

    if (community_id) {
      where.community_id = community_id;
    }

    if (event_id) {
      where.event_id = event_id;
    }

    if (author_id) {
      where.author_id = author_id;
    }

    const posts = await this.prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            start_date: true,
          },
        },
        _count: {
          select: { reactions: true },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
    });

    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            start_date: true,
          },
        },
        _count: {
          select: { reactions: true },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                avatar_url: true,
              },
            },
          },
          take: 10,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post non trouvé');
    }

    return post;
  }

  async create(createPostDto: CreatePostDto, userId: string) {
    const { content, community_id, event_id, media_urls = [] } = createPostDto;

    const post = await this.prisma.post.create({
      data: {
        content,
        media_urls,
        author_id: userId,
        community_id,
        event_id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            start_date: true,
          },
        },
        _count: {
          select: { reactions: true },
        },
      },
    });

    return post;
  }

  async react(id: string, userId: string, type: string = 'like') {
    // Check if post exists
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post non trouvé');
    }

    // Check if user already reacted
    const existingReaction = await this.prisma.reaction.findUnique({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: id,
        },
      },
    });

    if (existingReaction) {
      // Update reaction
      await this.prisma.reaction.update({
        where: {
          user_id_post_id: {
            user_id: userId,
            post_id: id,
          },
        },
        data: { type },
      });

      return { message: 'Réaction mise à jour' };
    }

    // Create new reaction
    await this.prisma.reaction.create({
      data: {
        user_id: userId,
        post_id: id,
        type,
      },
    });

    return { message: 'Réaction ajoutée' };
  }

  async removeReaction(id: string, userId: string) {
    const reaction = await this.prisma.reaction.findUnique({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: id,
        },
      },
    });

    if (!reaction) {
      throw new NotFoundException('Réaction non trouvée');
    }

    await this.prisma.reaction.delete({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: id,
        },
      },
    });

    return { message: 'Réaction supprimée' };
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post non trouvé');
    }

    // Check if user is the author
    if (post.author_id !== userId) {
      throw new ForbiddenException('Non autorisé à supprimer ce post');
    }

    await this.prisma.post.delete({
      where: { id },
    });

    return { message: 'Post supprimé avec succès' };
  }
}
