import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto, currentUserId: string): Promise<any>;
    search(query: string, limit?: number, offset?: number): Promise<any>;
    getUserCommunities(userId: string): Promise<any>;
    getUserEvents(userId: string, status?: string): Promise<any>;
}
