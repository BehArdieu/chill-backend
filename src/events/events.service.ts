import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    category?: string,
    community_id?: string,
    start_date?: string,
    end_date?: string,
    limit: number = 20,
    offset: number = 0,
    search?: string,
  ) {
    const where: any = {
      is_active: true,
      is_public: true,
    };

    if (category) {
      where.category = category;
    }

    if (community_id) {
      where.community_id = community_id;
    }

    if (start_date) {
      where.start_date = { gte: new Date(start_date) };
    }

    if (end_date) {
      where.end_date = { lte: new Date(end_date) };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const events = await this.prisma.event.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        start_date: true,
        end_date: true,
        address: true,
        max_participants: true,
        is_public: true,
        is_active: true,
        created_by: true,
        community_id: true,
        created_at: true,
        updated_at: true,
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
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
        _count: {
          select: { participants: true },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { start_date: 'asc' },
    });

    return events;
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        start_date: true,
        end_date: true,
        address: true,
        max_participants: true,
        is_public: true,
        is_active: true,
        created_by: true,
        community_id: true,
        created_at: true,
        updated_at: true,
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
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
        _count: {
          select: { participants: true },
        },
        participants: {
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

    if (!event) {
      throw new NotFoundException('Événement non trouvé');
    }

    return event;
  }

  async create(createEventDto: CreateEventDto, userId: string) {
    const {
      title,
      description,
      category,
      start_date,
      end_date,
      address,
      max_participants,
      community_id,
      is_public = true,
    } = createEventDto;

    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        category,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        address,
        max_participants: max_participants ? parseInt(max_participants) : null,
        is_public,
        created_by: userId,
        community_id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        start_date: true,
        end_date: true,
        address: true,
        max_participants: true,
        is_public: true,
        is_active: true,
        created_by: true,
        community_id: true,
        created_at: true,
        updated_at: true,
        community: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
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
        _count: {
          select: { participants: true },
        },
      },
    });

    return event;
  }

  async join(id: string, userId: string, status: string = 'going') {
    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Événement non trouvé');
    }

    // Check if user is already participating
    const existingParticipant = await this.prisma.eventParticipant.findUnique({
      where: {
        event_id_user_id: {
          event_id: id,
          user_id: userId,
        },
      },
    });

    if (existingParticipant) {
      // Update status
      await this.prisma.eventParticipant.update({
        where: {
          event_id_user_id: {
            event_id: id,
            user_id: userId,
          },
        },
        data: { status },
      });

      return { message: 'Statut de participation mis à jour' };
    }

    // Check max participants
    if (event.max_participants) {
      const participantCount = await this.prisma.eventParticipant.count({
        where: { event_id: id, status: 'going' },
      });

      if (participantCount >= event.max_participants) {
        throw new ConflictException('Événement complet');
      }
    }

    // Add participant
    await this.prisma.eventParticipant.create({
      data: {
        event_id: id,
        user_id: userId,
        status,
      },
    });

    return { message: 'Vous participez maintenant à cet événement' };
  }

  async leave(id: string, userId: string) {
    const participant = await this.prisma.eventParticipant.findUnique({
      where: {
        event_id_user_id: {
          event_id: id,
          user_id: userId,
        },
      },
    });

    if (!participant) {
      throw new NotFoundException('Vous ne participez pas à cet événement');
    }

    await this.prisma.eventParticipant.delete({
      where: {
        event_id_user_id: {
          event_id: id,
          user_id: userId,
        },
      },
    });

    return { message: 'Vous ne participez plus à cet événement' };
  }

  async getParticipants(id: string, status?: string, limit: number = 20, offset: number = 0) {
    const where: any = { event_id: id };
    if (status) {
      where.status = status;
    }

    const participants = await this.prisma.eventParticipant.findMany({
      where,
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
      take: limit,
      skip: offset,
      orderBy: { joined_at: 'desc' },
    });

    return participants;
  }
}
