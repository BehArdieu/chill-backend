import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
export declare class CommunitiesController {
    private readonly communitiesService;
    constructor(communitiesService: CommunitiesService);
    findAll(category?: string, search?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: any;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    create(createCommunityDto: CreateCommunityDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
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
        data: any;
    }>;
}
