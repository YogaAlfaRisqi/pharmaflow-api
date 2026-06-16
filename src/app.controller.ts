import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return {
      status: 'ok',
      message: '🚀 PharmaFlow API is running',
      version: 'v1',
      timestamp: new Date().toISOString(),
      endpoints: {
        api: '/api/v1',
        docs: '/api/docs',
      },
    };
  }
}
