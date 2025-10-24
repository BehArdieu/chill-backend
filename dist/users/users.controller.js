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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findOne(id) {
        const user = await this.usersService.findById(id);
        return {
            success: true,
            data: user,
        };
    }
    async update(id, updateUserDto, req) {
        const updatedUser = await this.usersService.update(id, updateUserDto, req.user.id);
        return {
            success: true,
            message: 'Profil mis à jour avec succès',
            data: updatedUser,
        };
    }
    async search(query, limit = '10', offset = '0') {
        if (!query) {
            return {
                success: false,
                error: 'Paramètre de recherche requis',
            };
        }
        const users = await this.usersService.search(query, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: users,
        };
    }
    async getUserCommunities(id) {
        const communities = await this.usersService.getUserCommunities(id);
        return {
            success: true,
            data: communities,
        };
    }
    async getUserEvents(id, status) {
        const events = await this.usersService.getUserEvents(id, status);
        return {
            success: true,
            data: events,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Profil d\'un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier le profil utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil mis à jour' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher des utilisateurs' }),
    (0, swagger_1.ApiQuery)({ name: 'q', description: 'Terme de recherche' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Résultats de recherche' }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id/communities'),
    (0, swagger_1.ApiOperation)({ summary: 'Communautés d\'un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des communautés' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserCommunities", null);
__decorate([
    (0, common_1.Get)(':id/events'),
    (0, swagger_1.ApiOperation)({ summary: 'Événements d\'un utilisateur' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Statut de participation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des événements' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserEvents", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map