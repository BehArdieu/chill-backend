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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async findAll(category, community_id, start_date, end_date, search, limit = '20', offset = '0') {
        const events = await this.eventsService.findAll(category, community_id, start_date, end_date, parseInt(limit), parseInt(offset), search);
        return {
            success: true,
            data: events,
        };
    }
    async findOne(id) {
        const event = await this.eventsService.findOne(id);
        return {
            success: true,
            data: event,
        };
    }
    async create(createEventDto, req) {
        const event = await this.eventsService.create(createEventDto, req.user.id);
        return {
            success: true,
            message: 'Événement créé avec succès',
            data: event,
        };
    }
    async join(id, status = 'going', req) {
        const result = await this.eventsService.join(id, req.user.id, status);
        return {
            success: true,
            message: result.message,
        };
    }
    async leave(id, req) {
        const result = await this.eventsService.leave(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async getParticipants(id, status, limit = '20', offset = '0') {
        const participants = await this.eventsService.getParticipants(id, status, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: participants,
        };
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des événements' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Catégorie' }),
    (0, swagger_1.ApiQuery)({ name: 'community_id', required: false, description: 'ID de la communauté' }),
    (0, swagger_1.ApiQuery)({ name: 'start_date', required: false, description: 'Date de début' }),
    (0, swagger_1.ApiQuery)({ name: 'end_date', required: false, description: 'Date de fin' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Recherche' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des événements' }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('community_id')),
    __param(2, (0, common_1.Query)('start_date')),
    __param(3, (0, common_1.Query)('end_date')),
    __param(4, (0, common_1.Query)('search')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détails d\'un événement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails de l\'événement' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Événement non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un événement' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Événement créé' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Participer à un événement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participation réussie' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Événement complet' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "join", null);
__decorate([
    (0, common_1.Delete)(':id/leave'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ne plus participer à un événement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sortie réussie' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Non participant' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "leave", null);
__decorate([
    (0, common_1.Get)(':id/participants'),
    (0, swagger_1.ApiOperation)({ summary: 'Participants d\'un événement' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Statut de participation' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des participants' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getParticipants", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)('events'),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map