import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    console.log('create cat');
    return ' Create Cat Post';
  }
}
