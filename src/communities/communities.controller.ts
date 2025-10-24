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
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des communautés' })
  @ApiQuery({ name: 'category', required: false, description: 'Catégorie' })
  @ApiQuery({ name: 'search', required: false, description: 'Recherche' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des communautés' })
  async findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const communities = await this.communitiesService.findAll(
      category,
      parseInt(limit),
      parseInt(offset),
      search,
    );

    return {
      success: true,
      data: communities,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'une communauté' })
  @ApiResponse({ status: 200, description: 'Détails de la communauté' })
  @ApiResponse({ status: 404, description: 'Communauté non trouvée' })
  async findOne(@Param('id') id: string) {
    const community = await this.communitiesService.findOne(id);
    return {
      success: true,
      data: community,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une communauté' })
  @ApiResponse({ status: 201, description: 'Communauté créée' })
  async create(@Body() createCommunityDto: CreateCommunityDto, @Request() req) {
    const community = await this.communitiesService.create(createCommunityDto, req.user.id);
    return {
      success: true,
      message: 'Communauté créée avec succès',
      data: community,
    };
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rejoindre une communauté' })
  @ApiResponse({ status: 200, description: 'Adhésion réussie' })
  @ApiResponse({ status: 409, description: 'Déjà membre' })
  async join(@Param('id') id: string, @Request() req) {
    const result = await this.communitiesService.join(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Delete(':id/leave')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitter une communauté' })
  @ApiResponse({ status: 200, description: 'Sortie réussie' })
  @ApiResponse({ status: 404, description: 'Non membre' })
  async leave(@Param('id') id: string, @Request() req) {
    const result = await this.communitiesService.leave(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Membres d\'une communauté' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des membres' })
  async getMembers(
    @Param('id') id: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const members = await this.communitiesService.getMembers(
      id,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: members,
    };
  }
}
