import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Ip,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(301)
  @Header('Cache-Control', 'none')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCatDto: CreateCatDto) {
    console.log(typeof createCatDto.age);

    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'get all cats';
  }

  @Get('ip')
  getIp(@Ip() ip): string {
    console.log({ ip });

    return ip;
  }

  @Get('ab*cd')
  xxx() {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    console.log();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query() data) {
    console.log('CatsController -> getDocs -> version', data);
    if (data.version && data.version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log({ params });
    return `Cat id: ${params.id}`;
  }
}
