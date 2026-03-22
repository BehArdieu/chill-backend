import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Santé du service (liveness)' })
  health() {
    return {
      status: 'ok',
      service: 'chill-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
