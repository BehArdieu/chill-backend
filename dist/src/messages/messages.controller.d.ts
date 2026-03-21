import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getConversations(limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: ({
            sender: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
            receiver: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            id: string;
            created_at: Date;
            community_id: string | null;
            content: string;
            event_id: string | null;
            receiver_id: string | null;
            sender_id: string;
            is_read: boolean;
        })[];
    }>;
    getMessages(userId: string, limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: ({
            sender: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
            receiver: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            id: string;
            created_at: Date;
            community_id: string | null;
            content: string;
            event_id: string | null;
            receiver_id: string | null;
            sender_id: string;
            is_read: boolean;
        })[];
    }>;
    create(createMessageDto: CreateMessageDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            sender: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
            receiver: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            id: string;
            created_at: Date;
            community_id: string | null;
            content: string;
            event_id: string | null;
            receiver_id: string | null;
            sender_id: string;
            is_read: boolean;
        };
    }>;
    markAsRead(id: string, req: any): Promise<{
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
}
