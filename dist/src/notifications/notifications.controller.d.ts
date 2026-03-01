import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(unread_only: string, limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: {
            type: string;
            title: string;
            id: string;
            created_at: Date;
            data: import("@prisma/client/runtime/library").JsonValue | null;
            content: string | null;
            user_id: string;
            is_read: boolean;
        }[];
    }>;
    markAsRead(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    markAllAsRead(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getUnreadCount(req: any): Promise<{
        success: boolean;
        data: {
            count: number;
        };
    }>;
    remove(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    removeAll(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
