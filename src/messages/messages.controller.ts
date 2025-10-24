import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Liste des conversations' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des conversations' })
  async getConversations(
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
    @Request() req,
  ) {
    const conversations = await this.messagesService.getConversations(
      req.user.id,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: conversations,
    };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Messages avec un utilisateur' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des messages' })
  async getMessages(
    @Param('userId') userId: string,
    @Query('limit') limit: string = '50',
    @Query('offset') offset: string = '0',
    @Request() req,
  ) {
    const messages = await this.messagesService.getMessages(
      req.user.id,
      userId,
      parseInt(limit),
      parseInt(offset),
    );

    return {
      success: true,
      data: messages,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Envoyer un message' })
  @ApiResponse({ status: 201, description: 'Message envoyé' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    const message = await this.messagesService.create(createMessageDto, req.user.id);
    return {
      success: true,
      message: 'Message envoyé avec succès',
      data: message,
    };
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Marquer un message comme lu' })
  @ApiResponse({ status: 200, description: 'Message marqué comme lu' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Message non trouvé' })
  async markAsRead(@Param('id') id: string, @Request() req) {
    const result = await this.messagesService.markAsRead(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Nombre de messages non lus' })
  @ApiResponse({ status: 200, description: 'Nombre de messages non lus' })
  async getUnreadCount(@Request() req) {
    const result = await this.messagesService.getUnreadCount(req.user.id);
    return {
      success: true,
      data: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un message' })
  @ApiResponse({ status: 200, description: 'Message supprimé' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Message non trouvé' })
  async remove(@Param('id') id: string, @Request() req) {
    const result = await this.messagesService.remove(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }
}
