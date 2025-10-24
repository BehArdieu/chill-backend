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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async findAll(community_id, event_id, author_id, limit = '20', offset = '0') {
        const posts = await this.postsService.findAll(community_id, event_id, author_id, parseInt(limit), parseInt(offset));
        return {
            success: true,
            data: posts,
        };
    }
    async findOne(id) {
        const post = await this.postsService.findOne(id);
        return {
            success: true,
            data: post,
        };
    }
    async create(createPostDto, req) {
        const post = await this.postsService.create(createPostDto, req.user.id);
        return {
            success: true,
            message: 'Post créé avec succès',
            data: post,
        };
    }
    async react(id, type = 'like', req) {
        const result = await this.postsService.react(id, req.user.id, type);
        return {
            success: true,
            message: result.message,
        };
    }
    async removeReaction(id, req) {
        const result = await this.postsService.removeReaction(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
    async remove(id, req) {
        const result = await this.postsService.remove(id, req.user.id);
        return {
            success: true,
            message: result.message,
        };
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des posts' }),
    (0, swagger_1.ApiQuery)({ name: 'community_id', required: false, description: 'ID de la communauté' }),
    (0, swagger_1.ApiQuery)({ name: 'event_id', required: false, description: 'ID de l\'événement' }),
    (0, swagger_1.ApiQuery)({ name: 'author_id', required: false, description: 'ID de l\'auteur' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Nombre de résultats' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Décalage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des posts' }),
    __param(0, (0, common_1.Query)('community_id')),
    __param(1, (0, common_1.Query)('event_id')),
    __param(2, (0, common_1.Query)('author_id')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détails d\'un post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails du post' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post créé' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/react'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Réagir à un post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réaction ajoutée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "react", null);
__decorate([
    (0, common_1.Delete)(':id/react'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une réaction' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réaction supprimée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Réaction non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "removeReaction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "remove", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map