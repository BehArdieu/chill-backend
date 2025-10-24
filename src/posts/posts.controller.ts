import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des posts' })
  @ApiQuery({ name: 'community_id', required: false, description: 'ID de la communauté' })
  @ApiQuery({ name: 'event_id', required: false, description: 'ID de l\'événement' })
  @ApiQuery({ name: 'author_id', required: false, description: 'ID de l\'auteur' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des posts' })
  async findAll(
    @Query('community_id') community_id?: string,
    @Query('event_id') event_id?: string,
    @Query('author_id') author_id?: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const posts = await this.postsService.findAll(
      community_id,
      event_id,
      author_id,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: posts,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un post' })
  @ApiResponse({ status: 200, description: 'Détails du post' })
  @ApiResponse({ status: 404, description: 'Post non trouvé' })
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return {
      success: true,
      data: post,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un post' })
  @ApiResponse({ status: 201, description: 'Post créé' })
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const post = await this.postsService.create(createPostDto, req.user.id);
    return {
      success: true,
      message: 'Post créé avec succès',
      data: post,
    };
  }

  @Post(':id/react')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Réagir à un post' })
  @ApiResponse({ status: 200, description: 'Réaction ajoutée' })
  @ApiResponse({ status: 404, description: 'Post non trouvé' })
  async react(
    @Param('id') id: string,
    @Body('type') type: string = 'like',
    @Request() req,
  ) {
    const result = await this.postsService.react(id, req.user.id, type);
    return {
      success: true,
      message: result.message,
    };
  }

  @Delete(':id/react')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une réaction' })
  @ApiResponse({ status: 200, description: 'Réaction supprimée' })
  @ApiResponse({ status: 404, description: 'Réaction non trouvée' })
  async removeReaction(@Param('id') id: string, @Request() req) {
    const result = await this.postsService.removeReaction(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un post' })
  @ApiResponse({ status: 200, description: 'Post supprimé' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Post non trouvé' })
  async remove(@Param('id') id: string, @Request() req) {
    const result = await this.postsService.remove(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }
}
