import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getConversations(userId: string, limit: number = 20, offset: number = 0) {
    const conversations = await this.prisma.message.findMany({
      where: {
        OR: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        receiver: {
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
      distinct: ['sender_id', 'receiver_id'],
    });

    return conversations;
  }

  async getMessages(userId: string, otherUserId: string, limit: number = 50, offset: number = 0) {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            sender_id: userId,
            receiver_id: otherUserId,
          },
          {
            sender_id: otherUserId,
            receiver_id: userId,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        receiver: {
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
      orderBy: { created_at: 'asc' },
    });

    return messages;
  }

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const { receiver_id, content, community_id, event_id } = createMessageDto;

    if (!receiver_id && !community_id && !event_id) {
      throw new Error('Destinataire, communauté ou événement requis');
    }

    const message = await this.prisma.message.create({
      data: {
        content,
        sender_id: userId,
        receiver_id,
        community_id,
        event_id,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        receiver: {
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

    return message;
  }

  async markAsRead(id: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Check if user is the receiver
    if (message.receiver_id !== userId) {
      throw new ForbiddenException('Non autorisé à marquer ce message comme lu');
    }

    await this.prisma.message.update({
      where: { id },
      data: { is_read: true },
    });

    return { message: 'Message marqué comme lu' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.message.count({
      where: {
        receiver_id: userId,
        is_read: false,
      },
    });

    return { count };
  }

  async remove(id: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Check if user is sender or receiver
    if (message.sender_id !== userId && message.receiver_id !== userId) {
      throw new ForbiddenException('Non autorisé à supprimer ce message');
    }

    await this.prisma.message.delete({
      where: { id },
    });

    return { message: 'Message supprimé avec succès' };
  }
}
