import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(301)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'create post';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'get all cats';
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
