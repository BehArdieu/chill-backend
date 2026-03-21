import { PrismaService } from '../common/prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, limit?: number, offset?: number, unread_only?: boolean): Promise<{
        type: string;
        title: string;
        id: string;
        created_at: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        content: string | null;
        user_id: string;
        is_read: boolean;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        message: string;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    removeAll(userId: string): Promise<{
        message: string;
    }>;
}
