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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                avatar_url: true,
                bio: true,
                interests: true,
                created_at: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return user;
    }
    async update(id, updateUserDto, currentUserId) {
        if (id !== currentUserId) {
            throw new common_1.ForbiddenException('Non autorisé à modifier ce profil');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                username: true,
                first_name: true,
                last_name: true,
                avatar_url: true,
                bio: true,
                interests: true,
                updated_at: true,
            },
        });
        return updatedUser;
    }
    async search(query, limit = 10, offset = 0) {
        const users = await this.prisma.user.findMany({
            where: {
                AND: [
                    { is_active: true },
                    {
                        OR: [
                            { username: { contains: query, mode: 'insensitive' } },
                            { first_name: { contains: query, mode: 'insensitive' } },
                            { last_name: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                avatar_url: true,
                bio: true,
                interests: true,
            },
            take: limit,
            skip: offset,
            orderBy: { created_at: 'desc' },
        });
        return users;
    }
    async getUserCommunities(userId) {
        const communities = await this.prisma.community.findMany({
            where: {
                members: {
                    some: { user_id: userId },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                avatar_url: true,
                cover_url: true,
                is_public: true,
                is_active: true,
                created_by: true,
                created_at: true,
                updated_at: true,
                _count: {
                    select: { members: true },
                },
            },
        });
        return communities;
    }
    async getUserEvents(userId, status) {
        const where = {
            participants: {
                some: { user_id: userId },
            },
        };
        if (status) {
            where.participants.some.status = status;
        }
        const events = await this.prisma.event.findMany({
            where,
            include: {
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                _count: {
                    select: { participants: true },
                },
            },
            orderBy: { start_date: 'desc' },
        });
        return events;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map