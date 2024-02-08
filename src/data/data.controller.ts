import { Controller, Get, Logger, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/roles/roles.guard';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private dataService: DataService) {}

    @Roles(Role.SUPER_ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Get('health')
    getHealthAdmin(@Req() req: Request, @Query() q){
        return q['h'] == '1'? this.dataService.getFullServiceStatus() : this.dataService.getServiceStatus();
    }
}
