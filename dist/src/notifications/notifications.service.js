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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, limit = 20, offset = 0, unread_only = false) {
        const where = {
            user_id: userId,
        };
        if (unread_only) {
            where.is_read = false;
        }
        const notifications = await this.prisma.notification.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { created_at: 'desc' },
        });
        return notifications;
    }
    async markAsRead(id, userId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification non trouvée');
        }
        if (notification.user_id !== userId) {
            throw new common_1.ForbiddenException('Non autorisé à marquer cette notification');
        }
        await this.prisma.notification.update({
            where: { id },
            data: { is_read: true },
        });
        return { message: 'Notification marquée comme lue' };
    }
    async markAllAsRead(userId) {
        await this.prisma.notification.updateMany({
            where: {
                user_id: userId,
                is_read: false,
            },
            data: { is_read: true },
        });
        return { message: 'Toutes les notifications ont été marquées comme lues' };
    }
    async getUnreadCount(userId) {
        const count = await this.prisma.notification.count({
            where: {
                user_id: userId,
                is_read: false,
            },
        });
        return { count };
    }
    async remove(id, userId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification non trouvée');
        }
        if (notification.user_id !== userId) {
            throw new common_1.ForbiddenException('Non autorisé à supprimer cette notification');
        }
        await this.prisma.notification.delete({
            where: { id },
        });
        return { message: 'Notification supprimée avec succès' };
    }
    async removeAll(userId) {
        await this.prisma.notification.deleteMany({
            where: {
                user_id: userId,
            },
        });
        return { message: 'Toutes les notifications ont été supprimées' };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map