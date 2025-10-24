import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, limit: number = 20, offset: number = 0, unread_only: boolean = false) {
    const where: any = {
      user_id: userId,
    };

    if (unread_only) {
      where.is_read = false;
    }

    const notifications = await this.prisma.notification.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
    });

    return notifications;
  }

  async markAsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    // Check if user owns this notification
    if (notification.user_id !== userId) {
      throw new ForbiddenException('Non autorisé à marquer cette notification');
    }

    await this.prisma.notification.update({
      where: { id },
      data: { is_read: true },
    });

    return { message: 'Notification marquée comme lue' };
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: { is_read: true },
    });

    return { message: 'Toutes les notifications ont été marquées comme lues' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });

    return { count };
  }

  async remove(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    // Check if user owns this notification
    if (notification.user_id !== userId) {
      throw new ForbiddenException('Non autorisé à supprimer cette notification');
    }

    await this.prisma.notification.delete({
      where: { id },
    });

    return { message: 'Notification supprimée avec succès' };
  }

  async removeAll(userId: string) {
    await this.prisma.notification.deleteMany({
      where: {
        user_id: userId,
      },
    });

    return { message: 'Toutes les notifications ont été supprimées' };
  }
}
