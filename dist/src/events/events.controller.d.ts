import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(category?: string, community_id?: string, start_date?: string, end_date?: string, search?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: {
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        };
    }>;
    create(createEventDto: CreateEventDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        };
    }>;
    join(id: string, status: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    leave(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getParticipants(id: string, status?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: ({
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
}
