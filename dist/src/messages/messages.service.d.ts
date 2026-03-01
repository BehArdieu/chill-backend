import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    getConversations(userId: string, limit?: number, offset?: number): Promise<any>;
    getMessages(userId: string, otherUserId: string, limit?: number, offset?: number): Promise<any>;
    create(createMessageDto: CreateMessageDto, userId: string): Promise<any>;
    markAsRead(id: string, userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: any;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
