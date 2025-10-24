import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(category?: string, community_id?: string, start_date?: string, end_date?: string, search?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: any;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    create(createEventDto: CreateEventDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    join(id: string, status: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    leave(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getParticipants(id: string, status?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
