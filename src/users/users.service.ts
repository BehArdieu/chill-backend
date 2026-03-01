import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        interests: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUserId: string) {
    // Check if user is updating their own profile
    if (id !== currentUserId) {
      throw new ForbiddenException('Non autorisé à modifier ce profil');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        interests: true,
        updated_at: true,
      },
    });

    return updatedUser;
  }

  async search(query: string, limit: number = 10, offset: number = 0) {
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          { is_active: true },
          {
            OR: [
              { username: { contains: query, mode: 'insensitive' } },
              { first_name: { contains: query, mode: 'insensitive' } },
              { last_name: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        interests: true,
      },
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
    });

    return users;
  }

  async getUserCommunities(userId: string) {
    const communities = await this.prisma.community.findMany({
      where: {
        members: {
          some: { user_id: userId },
        },
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
      },
    });

    return communities;
  }

  async getUserEvents(userId: string, status?: string) {
    const where: any = {
      participants: {
        some: { user_id: userId },
      },
    };

    if (status) {
      where.participants.some.status = status;
    }

    const events = await this.prisma.event.findMany({
      where,
      include: {
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        _count: {
          select: { participants: true },
        },
      },
      orderBy: { start_date: 'desc' },
    });

    return events;
  }
}
