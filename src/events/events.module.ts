import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventController } from './events.controller'; 
@Module({
  controllers: [EventController],
  providers: [PrismaService],
})
export class EventsModule {} 

 