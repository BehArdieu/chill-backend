import { 
  Controller, 
  Get, 
  Put, 
  Delete, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des notifications' })
  @ApiQuery({ name: 'unread_only', required: false, description: 'Notifications non lues uniquement' })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre de résultats' })
  @ApiQuery({ name: 'offset', required: false, description: 'Décalage' })
  @ApiResponse({ status: 200, description: 'Liste des notifications' })
  async findAll(
    @Query('unread_only') unread_only: string = 'false',
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
    @Request() req,
  ) {
    const notifications = await this.notificationsService.findAll(
      req.user.id,
      parseInt(limit),
      parseInt(offset),
      unread_only === 'true',
    );

    return {
      success: true,
      data: notifications,
    };
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Marquer une notification comme lue' })
  @ApiResponse({ status: 200, description: 'Notification marquée comme lue' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Notification non trouvée' })
  async markAsRead(@Param('id') id: string, @Request() req) {
    const result = await this.notificationsService.markAsRead(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Put('read-all')
  @ApiOperation({ summary: 'Marquer toutes les notifications comme lues' })
  @ApiResponse({ status: 200, description: 'Toutes les notifications marquées comme lues' })
  async markAllAsRead(@Request() req) {
    const result = await this.notificationsService.markAllAsRead(req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Nombre de notifications non lues' })
  @ApiResponse({ status: 200, description: 'Nombre de notifications non lues' })
  async getUnreadCount(@Request() req) {
    const result = await this.notificationsService.getUnreadCount(req.user.id);
    return {
      success: true,
      data: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une notification' })
  @ApiResponse({ status: 200, description: 'Notification supprimée' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Notification non trouvée' })
  async remove(@Param('id') id: string, @Request() req) {
    const result = await this.notificationsService.remove(id, req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Delete('all')
  @ApiOperation({ summary: 'Supprimer toutes les notifications' })
  @ApiResponse({ status: 200, description: 'Toutes les notifications supprimées' })
  async removeAll(@Request() req) {
    const result = await this.notificationsService.removeAll(req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }
}
