import { PrismaService } from '../common/prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, limit?: number, offset?: number, unread_only?: boolean): Promise<any>;
    markAsRead(id: string, userId: string): Promise<{
        message: string;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: any;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    removeAll(userId: string): Promise<{
        message: string;
    }>;
}
