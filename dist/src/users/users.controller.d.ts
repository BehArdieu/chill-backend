import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            first_name: string;
            last_name: string;
            bio: string;
            interests: string[];
            avatar_url: string;
            id: string;
            username: string;
            created_at: Date;
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            first_name: string;
            last_name: string;
            bio: string;
            interests: string[];
            avatar_url: string;
            id: string;
            email: string;
            username: string;
            updated_at: Date;
        };
    }>;
    search(query: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            first_name: string;
            last_name: string;
            bio: string;
            interests: string[];
            avatar_url: string;
            id: string;
            username: string;
        }[];
        error?: undefined;
    }>;
    getUserCommunities(id: string): Promise<{
        success: boolean;
        data: {
            name: string;
            description: string;
            avatar_url: string;
            id: string;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            _count: {
                members: number;
            };
            category: string;
            cover_url: string;
            is_public: boolean;
            created_by: string;
        }[];
    }>;
    getUserEvents(id: string, status?: string): Promise<{
        success: boolean;
        data: ({
            community: {
                name: string;
                avatar_url: string;
                id: string;
            };
            _count: {
                participants: number;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            location: string | null;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            category: string;
            is_public: boolean;
            created_by: string;
            start_date: Date;
            end_date: Date | null;
            address: string | null;
            max_participants: number | null;
            community_id: string | null;
        })[];
    }>;
}
