"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let EventsService = class EventsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category, community_id, start_date, end_date, limit = 20, offset = 0, search) {
        const where = {
            is_active: true,
            is_public: true,
        };
        if (category) {
            where.category = category;
        }
        if (community_id) {
            where.community_id = community_id;
        }
        if (start_date) {
            where.start_date = { gte: new Date(start_date) };
        }
        if (end_date) {
            where.end_date = { lte: new Date(end_date) };
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        const events = await this.prisma.event.findMany({
            where,
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                start_date: true,
                end_date: true,
                address: true,
                max_participants: true,
                is_public: true,
                is_active: true,
                created_by: true,
                community_id: true,
                created_at: true,
                updated_at: true,
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                created_by_user: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                _count: {
                    select: { participants: true },
                },
            },
            take: limit,
            skip: offset,
            orderBy: { start_date: 'asc' },
        });
        return events;
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                start_date: true,
                end_date: true,
                address: true,
                max_participants: true,
                is_public: true,
                is_active: true,
                created_by: true,
                community_id: true,
                created_at: true,
                updated_at: true,
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                created_by_user: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                _count: {
                    select: { participants: true },
                },
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                first_name: true,
                                last_name: true,
                                avatar_url: true,
                            },
                        },
                    },
                    take: 10,
                    orderBy: { joined_at: 'desc' },
                },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Événement non trouvé');
        }
        return event;
    }
    async create(createEventDto, userId) {
        const { title, description, category, start_date, end_date, address, max_participants, community_id, is_public = true, } = createEventDto;
        const event = await this.prisma.event.create({
            data: {
                title,
                description,
                category,
                start_date: new Date(start_date),
                end_date: end_date ? new Date(end_date) : null,
                address,
                max_participants: max_participants ? parseInt(max_participants) : null,
                is_public,
                created_by: userId,
                community_id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                start_date: true,
                end_date: true,
                address: true,
                max_participants: true,
                is_public: true,
                is_active: true,
                created_by: true,
                community_id: true,
                created_at: true,
                updated_at: true,
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                created_by_user: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                _count: {
                    select: { participants: true },
                },
            },
        });
        return event;
    }
    async join(id, userId, status = 'going') {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Événement non trouvé');
        }
        const existingParticipant = await this.prisma.eventParticipant.findUnique({
            where: {
                event_id_user_id: {
                    event_id: id,
                    user_id: userId,
                },
            },
        });
        if (existingParticipant) {
            await this.prisma.eventParticipant.update({
                where: {
                    event_id_user_id: {
                        event_id: id,
                        user_id: userId,
                    },
                },
                data: { status },
            });
            return { message: 'Statut de participation mis à jour' };
        }
        if (event.max_participants) {
            const participantCount = await this.prisma.eventParticipant.count({
                where: { event_id: id, status: 'going' },
            });
            if (participantCount >= event.max_participants) {
                throw new common_1.ConflictException('Événement complet');
            }
        }
        await this.prisma.eventParticipant.create({
            data: {
                event_id: id,
                user_id: userId,
                status,
            },
        });
        return { message: 'Vous participez maintenant à cet événement' };
    }
    async leave(id, userId) {
        const participant = await this.prisma.eventParticipant.findUnique({
            where: {
                event_id_user_id: {
                    event_id: id,
                    user_id: userId,
                },
            },
        });
        if (!participant) {
            throw new common_1.NotFoundException('Vous ne participez pas à cet événement');
        }
        await this.prisma.eventParticipant.delete({
            where: {
                event_id_user_id: {
                    event_id: id,
                    user_id: userId,
                },
            },
        });
        return { message: 'Vous ne participez plus à cet événement' };
    }
    async getParticipants(id, status, limit = 20, offset = 0) {
        const where = { event_id: id };
        if (status) {
            where.status = status;
        }
        const participants = await this.prisma.eventParticipant.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
            },
            take: limit,
            skip: offset,
            orderBy: { joined_at: 'desc' },
        });
        return participants;
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map