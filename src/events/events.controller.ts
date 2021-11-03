import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEventDto } from './update-event.dto';
import { Event } from '.prisma/client';
@Controller('/events')
export class EventController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
  @Post()
  async create(@Body() body: CreateEventDto) {
    return await this.prisma.event.create({
      data: {
        ...body,
        date: new Date(body.date),
      },
    });
  }
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() body: UpdateEventDto) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : event.date,
      },
    });
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return await this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
