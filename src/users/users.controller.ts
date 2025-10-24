import { 
  Controller, 
  Get, 
  Put, 
  Param, 
  Body, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Profil d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Profil utilisateur' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return {
      success: true,
      data: user,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier le profil utilisateur' })
  @ApiResponse({ status: 200, description: 'Profil mis à jour' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto, req.user.id);
    return {
      success: true,
      message: 'Profil mis à jour avec succès',
      data: updatedUser,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des utilisateurs' })
  @ApiQuery({ name: 'q', description: 'Terme de recherche' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Résultats de recherche' })
  async search(
    @Query('q') query: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    if (!query) {
      return {
        success: false,
        error: 'Paramètre de recherche requis',
      };
    }

    const users = await this.usersService.search(
      query,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: users,
    };
  }

  @Get(':id/communities')
  @ApiOperation({ summary: 'Communautés d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des communautés' })
  async getUserCommunities(@Param('id') id: string) {
    const communities = await this.usersService.getUserCommunities(id);
    return {
      success: true,
      data: communities,
    };
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Événements d\'un utilisateur' })
  @ApiQuery({ name: 'status', required: false, description: 'Statut de participation' })
  @ApiResponse({ status: 200, description: 'Liste des événements' })
  async getUserEvents(
    @Param('id') id: string,
    @Query('status') status?: string,
  ) {
    const events = await this.usersService.getUserEvents(id, status);
    return {
      success: true,
      data: events,
    };
  }
}
