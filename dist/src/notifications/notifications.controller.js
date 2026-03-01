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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async findAll(unread_only = 'false', limit = '20', offset = '0', req) {
        const notifications = await this.notificationsService.findAll(req.user.id, parseInt(limit), parseInt(offset), unread_only === 'true');
        return {
            success: true,
            data: notifications,
        };
    }
    async markAsRead(id, req) {
        const result = await this.notificationsService.markAsRead(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async markAllAsRead(req) {
        const result = await this.notificationsService.markAllAsRead(req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async getUnreadCount(req) {
        const result = await this.notificationsService.getUnreadCount(req.user.id);
        return {
            success: true,
            data: result,
        };
    }
    async remove(id, req) {
        const result = await this.notificationsService.remove(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async removeAll(req) {
        const result = await this.notificationsService.removeAll(req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des notifications' }),
    (0, swagger_1.ApiQuery)({ name: 'unread_only', required: false, description: 'Notifications non lues uniquement' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des notifications' }),
    __param(0, (0, common_1.Query)('unread_only')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Marquer une notification comme lue' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marquée comme lue' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Put)('read-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Marquer toutes les notifications comme lues' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Toutes les notifications marquées comme lues' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Get)('unread/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Nombre de notifications non lues' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nombre de notifications non lues' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une notification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification supprimée' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer toutes les notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Toutes les notifications supprimées' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "removeAll", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map