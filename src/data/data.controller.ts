import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/roles/roles.guard';
import { DataService } from './data.service';

@Controller('data')
export class DataController {

    constructor(private dataService: DataService) {}

    @Roles(Role.USER)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Get('health')
    getHealth(@Request() req){
        return "OK";
    }

    @Get('formentry')
    getFormentry(){
        return this.dataService.getFormentry();
    }
}
