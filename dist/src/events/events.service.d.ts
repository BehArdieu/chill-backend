import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string, community_id?: string, start_date?: string, end_date?: string, limit?: number, offset?: number, search?: string): Promise<{
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        description: string;
        title: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        _count: {
            participants: number;
        };
        category: string;
        is_public: boolean;
        created_by: string;
        created_by_user: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
        start_date: Date;
        end_date: Date;
        address: string;
        max_participants: number;
        community_id: string;
    }[]>;
    findOne(id: string): Promise<{
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        description: string;
        title: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        _count: {
            participants: number;
        };
        category: string;
        is_public: boolean;
        created_by: string;
        created_by_user: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
        start_date: Date;
        end_date: Date;
        address: string;
        max_participants: number;
        community_id: string;
        participants: ({
            user: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            id: string;
            status: string;
            joined_at: Date;
            user_id: string;
            event_id: string;
        })[];
    }>;
    create(createEventDto: CreateEventDto, userId: string): Promise<{
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        description: string;
        title: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        _count: {
            participants: number;
        };
        category: string;
        is_public: boolean;
        created_by: string;
        created_by_user: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
        start_date: Date;
        end_date: Date;
        address: string;
        max_participants: number;
        community_id: string;
    }>;
    join(id: string, userId: string, status?: string): Promise<{
        message: string;
    }>;
    leave(id: string, userId: string): Promise<{
        message: string;
    }>;
    getParticipants(id: string, status?: string, limit?: number, offset?: number): Promise<({
        user: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
    } & {
        id: string;
        status: string;
        joined_at: Date;
        user_id: string;
        event_id: string;
    })[]>;
}
