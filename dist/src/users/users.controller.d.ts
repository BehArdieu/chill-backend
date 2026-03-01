import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    search(query: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        error?: undefined;
    }>;
    getUserCommunities(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    getUserEvents(id: string, status?: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
