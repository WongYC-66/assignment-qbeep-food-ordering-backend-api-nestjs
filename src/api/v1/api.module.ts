import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApiController],
  // providers: [CatsService],
})
export class ApiV1Module { }
