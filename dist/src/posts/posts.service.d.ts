import { PrismaService } from '../common/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(community_id?: string, event_id?: string, author_id?: string, limit?: number, offset?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createPostDto: CreatePostDto, userId: string): Promise<any>;
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
