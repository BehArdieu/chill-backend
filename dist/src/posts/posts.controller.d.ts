import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(community_id?: string, event_id?: string, author_id?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: ({
            event: {
                title: string;
                id: string;
                start_date: Date;
            };
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        })[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            event: {
                title: string;
                id: string;
                start_date: Date;
            };
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        };
    }>;
    create(createPostDto: CreatePostDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            event: {
                title: string;
                id: string;
                start_date: Date;
            };
            community: {
                name: string;
                avatar_url: string;
                id: string;
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
        };
    }>;
    react(id: string, type: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    removeReaction(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
