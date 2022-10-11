import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminController } from './admin/admin.controller';
import { TutienController } from './tutien/tutien.controller';
import { AccountController } from './account/account.controller';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [
    AppController,
    AdminController,
    AccountController,
    TutienController,
  ],
  providers: [AppService],
})
export class AppModule {}
