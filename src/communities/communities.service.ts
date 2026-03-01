import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string, limit: number = 20, offset: number = 0, search?: string) {
    const where: any = {
      is_active: true,
      is_public: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const communities = await this.prisma.community.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        avatar_url: true,
        cover_url: true,
        is_public: true,
        is_active: true,
        created_by: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: { members: true },
        },
        created_by_user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
    });

    return communities;
  }

  async findOne(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        avatar_url: true,
        cover_url: true,
        is_public: true,
        is_active: true,
        created_by: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: { members: true },
        },
        created_by_user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        members: {
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
          orderBy: { joined_at: 'desc' },
        },
      },
    });

    if (!community) {
      throw new NotFoundException('Communauté non trouvée');
    }

    return community;
  }

  async create(createCommunityDto: CreateCommunityDto, userId: string) {
    const { name, description, category, avatar_url, cover_url, is_public = true } = createCommunityDto;

    const community = await this.prisma.community.create({
      data: {
        name,
        description,
        category,
        avatar_url,
        cover_url,
        is_public,
        created_by: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        avatar_url: true,
        cover_url: true,
        is_public: true,
        is_active: true,
        created_by: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: { members: true },
        },
        created_by_user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
    });

    // Add creator as admin
    await this.prisma.communityMember.create({
      data: {
        community_id: community.id,
        user_id: userId,
        role: 'admin',
      },
    });

    return community;
  }

  async join(id: string, userId: string) {
    // Check if community exists
    const community = await this.prisma.community.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!community) {
      throw new NotFoundException('Communauté non trouvée');
    }

    // Check if user is already a member
    const existingMember = await this.prisma.communityMember.findUnique({
      where: {
        community_id_user_id: {
          community_id: id,
          user_id: userId,
        },
      },
    });

    if (existingMember) {
      throw new ConflictException('Vous êtes déjà membre de cette communauté');
    }

    // Add user to community
    await this.prisma.communityMember.create({
      data: {
        community_id: id,
        user_id: userId,
        role: 'member',
      },
    });

    return { message: 'Vous avez rejoint la communauté avec succès' };
  }

  async leave(id: string, userId: string) {
    const member = await this.prisma.communityMember.findUnique({
      where: {
        community_id_user_id: {
          community_id: id,
          user_id: userId,
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Vous n\'êtes pas membre de cette communauté');
    }

    await this.prisma.communityMember.delete({
      where: {
        community_id_user_id: {
          community_id: id,
          user_id: userId,
        },
      },
    });

    return { message: 'Vous avez quitté la communauté' };
  }

  async getMembers(id: string, limit: number = 20, offset: number = 0) {
    const members = await this.prisma.communityMember.findMany({
      where: { community_id: id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
            bio: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { joined_at: 'desc' },
    });

    return members;
  }
}
