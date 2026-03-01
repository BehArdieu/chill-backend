import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(community_id?: string, event_id?: string, author_id?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: any;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    create(createPostDto: CreatePostDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
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
