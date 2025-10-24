import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string, community_id?: string, start_date?: string, end_date?: string, limit?: number, offset?: number, search?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createEventDto: CreateEventDto, userId: string): Promise<any>;
    join(id: string, userId: string, status?: string): Promise<{
        message: string;
    }>;
    leave(id: string, userId: string): Promise<{
        message: string;
    }>;
    getParticipants(id: string, status?: string, limit?: number, offset?: number): Promise<any>;
}
