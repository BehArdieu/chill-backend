import { PrismaService } from '../common/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
export declare class CommunitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string, limit?: number, offset?: number, search?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createCommunityDto: CreateCommunityDto, userId: string): Promise<any>;
    join(id: string, userId: string): Promise<{
        message: string;
    }>;
    leave(id: string, userId: string): Promise<{
        message: string;
    }>;
    getMembers(id: string, limit?: number, offset?: number): Promise<any>;
}
