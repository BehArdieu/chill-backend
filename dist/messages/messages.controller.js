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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async getConversations(limit = '20', offset = '0', req) {
        const conversations = await this.messagesService.getConversations(req.user.id, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: conversations,
        };
    }
    async getMessages(userId, limit = '50', offset = '0', req) {
        const messages = await this.messagesService.getMessages(req.user.id, userId, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: messages,
        };
    }
    async create(createMessageDto, req) {
        const message = await this.messagesService.create(createMessageDto, req.user.id);
        return {
            success: true,
            message: 'Message envoyé avec succès',
            data: message,
        };
    }
    async markAsRead(id, req) {
        const result = await this.messagesService.markAsRead(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async getUnreadCount(req) {
        const result = await this.messagesService.getUnreadCount(req.user.id);
        return {
            success: true,
            data: result,
        };
    }
    async remove(id, req) {
        const result = await this.messagesService.remove(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des conversations' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des conversations' }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Messages avec un utilisateur' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des messages' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Envoyer un message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message envoyé' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Marquer un message comme lu' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message marqué comme lu' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Get)('unread/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Nombre de messages non lus' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nombre de messages non lus' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "remove", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map