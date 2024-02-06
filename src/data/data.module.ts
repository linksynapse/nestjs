import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}

/*
, {
    provide: APP_GUARD,
    useClass: AuthGuard
  },{
    provide: APP_GUARD,
    useClass: RoleGuard,
  }
*/