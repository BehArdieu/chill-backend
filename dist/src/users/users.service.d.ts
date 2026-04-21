import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        first_name: string;
        last_name: string;
        bio: string;
        interests: string[];
        avatar_url: string;
        id: string;
        username: string;
        created_at: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, currentUserId: string): Promise<{
        first_name: string;
        last_name: string;
        bio: string;
        interests: string[];
        avatar_url: string;
        id: string;
        email: string;
        username: string;
        updated_at: Date;
    }>;
    search(query: string, limit?: number, offset?: number): Promise<{
        first_name: string;
        last_name: string;
        bio: string;
        interests: string[];
        avatar_url: string;
        id: string;
        username: string;
    }[]>;
    getUserCommunities(userId: string): Promise<{
        description: string;
        name: string;
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
    }[]>;
    getUserEvents(userId: string, status?: string): Promise<({
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
    })[]>;
}
