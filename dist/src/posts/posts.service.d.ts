import { PrismaService } from '../common/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(community_id?: string, event_id?: string, author_id?: string, limit?: number, offset?: number): Promise<({
        event: {
            title: string;
            id: string;
            start_date: Date;
        };
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        _count: {
            reactions: number;
        };
        author: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        is_public: boolean;
        community_id: string | null;
        content: string;
        event_id: string | null;
        media_urls: string[];
        author_id: string;
    })[]>;
    findOne(id: string): Promise<{
        event: {
            title: string;
            id: string;
            start_date: Date;
        };
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        reactions: ({
            user: {
                first_name: string;
                last_name: string;
                avatar_url: string;
                id: string;
                username: string;
            };
        } & {
            type: string;
            id: string;
            created_at: Date;
            user_id: string;
            post_id: string;
        })[];
        _count: {
            reactions: number;
        };
        author: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        is_public: boolean;
        community_id: string | null;
        content: string;
        event_id: string | null;
        media_urls: string[];
        author_id: string;
    }>;
    create(createPostDto: CreatePostDto, userId: string): Promise<{
        event: {
            title: string;
            id: string;
            start_date: Date;
        };
        community: {
            avatar_url: string;
            id: string;
            name: string;
        };
        _count: {
            reactions: number;
        };
        author: {
            first_name: string;
            last_name: string;
            avatar_url: string;
            id: string;
            username: string;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        is_public: boolean;
        community_id: string | null;
        content: string;
        event_id: string | null;
        media_urls: string[];
        author_id: string;
    }>;
    react(id: string, userId: string, type?: string): Promise<{
        message: string;
    }>;
    removeReaction(id: string, userId: string): Promise<{
        message: string;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
