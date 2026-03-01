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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getConversations(userId, limit = 20, offset = 0) {
        const conversations = await this.prisma.message.findMany({
            where: {
                OR: [
                    { sender_id: userId },
                    { receiver_id: userId },
                ],
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                receiver: {
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
            distinct: ['sender_id', 'receiver_id'],
        });
        return conversations;
    }
    async getMessages(userId, otherUserId, limit = 50, offset = 0) {
        const messages = await this.prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender_id: userId,
                        receiver_id: otherUserId,
                    },
                    {
                        sender_id: otherUserId,
                        receiver_id: userId,
                    },
                ],
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                receiver: {
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
            orderBy: { created_at: 'asc' },
        });
        return messages;
    }
    async create(createMessageDto, userId) {
        const { receiver_id, content, community_id, event_id } = createMessageDto;
        if (!receiver_id && !community_id && !event_id) {
            throw new Error('Destinataire, communauté ou événement requis');
        }
        const message = await this.prisma.message.create({
            data: {
                content,
                sender_id: userId,
                receiver_id,
                community_id,
                event_id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                receiver: {
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
        return message;
    }
    async markAsRead(id, userId) {
        const message = await this.prisma.message.findUnique({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message non trouvé');
        }
        if (message.receiver_id !== userId) {
            throw new common_1.ForbiddenException('Non autorisé à marquer ce message comme lu');
        }
        await this.prisma.message.update({
            where: { id },
            data: { is_read: true },
        });
        return { message: 'Message marqué comme lu' };
    }
    async getUnreadCount(userId) {
        const count = await this.prisma.message.count({
            where: {
                receiver_id: userId,
                is_read: false,
            },
        });
        return { count };
    }
    async remove(id, userId) {
        const message = await this.prisma.message.findUnique({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message non trouvé');
        }
        if (message.sender_id !== userId && message.receiver_id !== userId) {
            throw new common_1.ForbiddenException('Non autorisé à supprimer ce message');
        }
        await this.prisma.message.delete({
            where: { id },
        });
        return { message: 'Message supprimé avec succès' };
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map