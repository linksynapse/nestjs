import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { RoleModule } from './roles/roles.module';
import { DataModule } from './data/data.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [AuthModule, UsersModule, RoleModule, DataModule, HrModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
