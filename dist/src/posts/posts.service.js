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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(community_id, event_id, author_id, limit = 20, offset = 0) {
        const where = {
            is_public: true,
        };
        if (community_id) {
            where.community_id = community_id;
        }
        if (event_id) {
            where.event_id = event_id;
        }
        if (author_id) {
            where.author_id = author_id;
        }
        const posts = await this.prisma.post.findMany({
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                event: {
                    select: {
                        id: true,
                        title: true,
                        start_date: true,
                    },
                },
                _count: {
                    select: { reactions: true },
                },
            },
            take: limit,
            skip: offset,
            orderBy: { created_at: 'desc' },
        });
        return posts;
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                event: {
                    select: {
                        id: true,
                        title: true,
                        start_date: true,
                    },
                },
                _count: {
                    select: { reactions: true },
                },
                reactions: {
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
                    orderBy: { created_at: 'desc' },
                },
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post non trouvé');
        }
        return post;
    }
    async create(createPostDto, userId) {
        const { content, community_id, event_id, media_urls = [] } = createPostDto;
        const post = await this.prisma.post.create({
            data: {
                content,
                media_urls,
                author_id: userId,
                community_id,
                event_id,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        last_name: true,
                        avatar_url: true,
                    },
                },
                community: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true,
                    },
                },
                event: {
                    select: {
                        id: true,
                        title: true,
                        start_date: true,
                    },
                },
                _count: {
                    select: { reactions: true },
                },
            },
        });
        return post;
    }
    async react(id, userId, type = 'like') {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post non trouvé');
        }
        const existingReaction = await this.prisma.reaction.findUnique({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: id,
                },
            },
        });
        if (existingReaction) {
            await this.prisma.reaction.update({
                where: {
                    user_id_post_id: {
                        user_id: userId,
                        post_id: id,
                    },
                },
                data: { type },
            });
            return { message: 'Réaction mise à jour' };
        }
        await this.prisma.reaction.create({
            data: {
                user_id: userId,
                post_id: id,
                type,
            },
        });
        return { message: 'Réaction ajoutée' };
    }
    async removeReaction(id, userId) {
        const reaction = await this.prisma.reaction.findUnique({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: id,
                },
            },
        });
        if (!reaction) {
            throw new common_1.NotFoundException('Réaction non trouvée');
        }
        await this.prisma.reaction.delete({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: id,
                },
            },
        });
        return { message: 'Réaction supprimée' };
    }
    async remove(id, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post non trouvé');
        }
        if (post.author_id !== userId) {
            throw new common_1.ForbiddenException('Non autorisé à supprimer ce post');
        }
        await this.prisma.post.delete({
            where: { id },
        });
        return { message: 'Post supprimé avec succès' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map