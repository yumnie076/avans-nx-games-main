import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gamesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gamesService.delete(id);
  }
}
