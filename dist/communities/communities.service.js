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
exports.CommunitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let CommunitiesService = class CommunitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category, limit = 20, offset = 0, search) {
        const where = {
            is_active: true,
            is_public: true,
        };
        if (category) {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        const communities = await this.prisma.community.findMany({
            where,
            include: {
                _count: {
                    select: { community_members: true },
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
            },
            take: limit,
            skip: offset,
            orderBy: { created_at: 'desc' },
        });
        return communities;
    }
    async findOne(id) {
        const community = await this.prisma.community.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { community_members: true },
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
                community_members: {
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
        if (!community) {
            throw new common_1.NotFoundException('Communauté non trouvée');
        }
        return community;
    }
    async create(createCommunityDto, userId) {
        const { name, description, category, avatar_url, cover_url, is_public = true } = createCommunityDto;
        const community = await this.prisma.community.create({
            data: {
                name,
                description,
                category,
                avatar_url,
                cover_url,
                is_public,
                created_by: userId,
            },
            include: {
                _count: {
                    select: { community_members: true },
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
            },
        });
        await this.prisma.communityMember.create({
            data: {
                community_id: community.id,
                user_id: userId,
                role: 'admin',
            },
        });
        return community;
    }
    async join(id, userId) {
        const community = await this.prisma.community.findUnique({
            where: { id },
        });
        if (!community) {
            throw new common_1.NotFoundException('Communauté non trouvée');
        }
        const existingMember = await this.prisma.communityMember.findUnique({
            where: {
                community_id_user_id: {
                    community_id: id,
                    user_id: userId,
                },
            },
        });
        if (existingMember) {
            throw new common_1.ConflictException('Vous êtes déjà membre de cette communauté');
        }
        await this.prisma.communityMember.create({
            data: {
                community_id: id,
                user_id: userId,
                role: 'member',
            },
        });
        return { message: 'Vous avez rejoint la communauté avec succès' };
    }
    async leave(id, userId) {
        const member = await this.prisma.communityMember.findUnique({
            where: {
                community_id_user_id: {
                    community_id: id,
                    user_id: userId,
                },
            },
        });
        if (!member) {
            throw new common_1.NotFoundException('Vous n\'êtes pas membre de cette communauté');
        }
        await this.prisma.communityMember.delete({
            where: {
                community_id_user_id: {
                    community_id: id,
                    user_id: userId,
                },
            },
        });
        return { message: 'Vous avez quitté la communauté' };
    }
    async getMembers(id, limit = 20, offset = 0) {
        const members = await this.prisma.communityMember.findMany({
            where: { community_id: id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                        bio: true,
                    },
                },
            },
            take: limit,
            skip: offset,
            orderBy: { joined_at: 'desc' },
        });
        return members;
    }
};
exports.CommunitiesService = CommunitiesService;
exports.CommunitiesService = CommunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunitiesService);
//# sourceMappingURL=communities.service.js.map