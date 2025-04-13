// libs/backend/features/src/lib/seed.controller.ts

import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post('demo-data')
  async createDemoData() {
    await this.seedService.seed();
    return { message: 'Demo data seeded!' };
  }
}
