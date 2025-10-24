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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des événements' })
  @ApiQuery({ name: 'category', required: false, description: 'Catégorie' })
  @ApiQuery({ name: 'community_id', required: false, description: 'ID de la communauté' })
  @ApiQuery({ name: 'start_date', required: false, description: 'Date de début' })
  @ApiQuery({ name: 'end_date', required: false, description: 'Date de fin' })
  @ApiQuery({ name: 'search', required: false, description: 'Recherche' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des événements' })
  async findAll(
    @Query('category') category?: string,
    @Query('community_id') community_id?: string,
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
    @Query('search') search?: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const events = await this.eventsService.findAll(
      category,
      community_id,
      start_date,
      end_date,
      parseInt(limit),
      parseInt(offset),
      search,
    );

    return {
      success: true,
      data: events,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un événement' })
  @ApiResponse({ status: 200, description: 'Détails de l\'événement' })
  @ApiResponse({ status: 404, description: 'Événement non trouvé' })
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    return {
      success: true,
      data: event,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un événement' })
  @ApiResponse({ status: 201, description: 'Événement créé' })
  async create(@Body() createEventDto: CreateEventDto, @Request() req) {
    const event = await this.eventsService.create(createEventDto, req.user.id);
    return {
      success: true,
      message: 'Événement créé avec succès',
      data: event,
    };
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Participer à un événement' })
  @ApiResponse({ status: 200, description: 'Participation réussie' })
  @ApiResponse({ status: 409, description: 'Événement complet' })
  async join(
    @Param('id') id: string,
    @Body('status') status: string = 'going',
    @Request() req,
  ) {
    const result = await this.eventsService.join(id, req.user.id, status);
    return {
      success: true,
      message: result.message,
    };
  }

  @Delete(':id/leave')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ne plus participer à un événement' })
  @ApiResponse({ status: 200, description: 'Sortie réussie' })
  @ApiResponse({ status: 404, description: 'Non participant' })
  async leave(@Param('id') id: string, @Request() req) {
    const result = await this.eventsService.leave(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Participants d\'un événement' })
  @ApiQuery({ name: 'status', required: false, description: 'Statut de participation' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des participants' })
  async getParticipants(
    @Param('id') id: string,
    @Query('status') status?: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const participants = await this.eventsService.getParticipants(
      id,
      status,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: participants,
    };
  }
}
