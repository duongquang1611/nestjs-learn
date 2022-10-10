import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminController } from './admin/admin.controller';
import { AccountController } from './account/account.controller';
import { TutienController } from './tutien/tutien.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
    TutienController,
  ],
  providers: [AppService],
})
export class AppModule {}
