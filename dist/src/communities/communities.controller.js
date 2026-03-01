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
exports.CommunitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const communities_service_1 = require("./communities.service");
const create_community_dto_1 = require("./dto/create-community.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CommunitiesController = class CommunitiesController {
    constructor(communitiesService) {
        this.communitiesService = communitiesService;
    }
    async findAll(category, search, limit = '20', offset = '0') {
        const communities = await this.communitiesService.findAll(category, parseInt(limit), parseInt(offset), search);
        return {
            success: true,
            data: communities,
        };
    }
    async findOne(id) {
        const community = await this.communitiesService.findOne(id);
        return {
            success: true,
            data: community,
        };
    }
    async create(createCommunityDto, req) {
        const community = await this.communitiesService.create(createCommunityDto, req.user.id);
        return {
            success: true,
            message: 'Communauté créée avec succès',
            data: community,
        };
    }
    async join(id, req) {
        const result = await this.communitiesService.join(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async leave(id, req) {
        const result = await this.communitiesService.leave(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async getMembers(id, limit = '20', offset = '0') {
        const members = await this.communitiesService.getMembers(id, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: members,
        };
    }
};
exports.CommunitiesController = CommunitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des communautés' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Catégorie' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Recherche' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des communautés' }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détails d\'une communauté' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails de la communauté' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Communauté non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une communauté' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Communauté créée' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_community_dto_1.CreateCommunityDto, Object]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Rejoindre une communauté' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adhésion réussie' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Déjà membre' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "join", null);
__decorate([
    (0, common_1.Delete)(':id/leave'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Quitter une communauté' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sortie réussie' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Non membre' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "leave", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiOperation)({ summary: 'Membres d\'une communauté' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des membres' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "getMembers", null);
exports.CommunitiesController = CommunitiesController = __decorate([
    (0, swagger_1.ApiTags)('communities'),
    (0, common_1.Controller)('communities'),
    __metadata("design:paramtypes", [communities_service_1.CommunitiesService])
], CommunitiesController);
//# sourceMappingURL=communities.controller.js.map