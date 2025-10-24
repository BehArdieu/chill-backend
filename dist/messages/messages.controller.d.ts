import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getConversations(limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: any;
    }>;
    getMessages(userId: string, limit: string, offset: string, req: any): Promise<{
        success: boolean;
        data: any;
    }>;
    create(createMessageDto: CreateMessageDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    markAsRead(id: string, req: any): Promise<{
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
}
