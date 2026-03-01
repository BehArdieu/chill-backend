import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    getConversations(userId: string, limit?: number, offset?: number): Promise<({
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
    })[]>;
    getMessages(userId: string, otherUserId: string, limit?: number, offset?: number): Promise<({
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
    })[]>;
    create(createMessageDto: CreateMessageDto, userId: string): Promise<{
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
    }>;
    markAsRead(id: string, userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
