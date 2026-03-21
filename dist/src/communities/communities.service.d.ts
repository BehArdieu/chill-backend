import { PrismaService } from '../common/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
export declare class CommunitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string, limit?: number, offset?: number, search?: string): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    create(createCommunityDto: CreateCommunityDto, userId: string): Promise<{
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
    }>;
    join(id: string, userId: string): Promise<{
        message: string;
    }>;
    leave(id: string, userId: string): Promise<{
        message: string;
    }>;
    getMembers(id: string, limit?: number, offset?: number): Promise<({
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
    })[]>;
}
