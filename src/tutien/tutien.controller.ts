import { Controller, Get } from '@nestjs/common';

@Controller('tutien')
export class TutienController {
  @Get()
  getNe(): string {
    return 'abc';
  }
}
