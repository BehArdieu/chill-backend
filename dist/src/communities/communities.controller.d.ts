import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
export declare class CommunitiesController {
    private readonly communitiesService;
    constructor(communitiesService: CommunitiesService);
    findAll(category?: string, search?: string, limit?: string, offset?: string): Promise<{
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
            created_by_user: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        }[];
    }>;
    findOne(id: string): Promise<{
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
            created_by_user: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
            members: ({
                user: {
                    first_name: string;
                    last_name: string;
                    avatar_url: string;
                    id: string;
                    username: string;
                };
            } & {
                id: string;
                community_id: string;
                joined_at: Date;
                user_id: string;
                role: string;
            })[];
        };
    }>;
    create(createCommunityDto: CreateCommunityDto, req: any): Promise<{
        success: boolean;
        message: string;
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
            created_by_user: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        };
    }>;
    join(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    leave(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getMembers(id: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: ({
            user: {
                first_name: string;
                last_name: string;
                bio: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            id: string;
            community_id: string;
            joined_at: Date;
            user_id: string;
            role: string;
        })[];
    }>;
}
