import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(unread_only: string, limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: any;
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
            count: any;
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
