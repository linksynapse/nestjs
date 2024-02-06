import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/roles/roles.guard';

@Controller('data')
export class DataController {

    @Roles(Role.USER)
    @Roles(Role.SUPER_ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Get('health')
    getHealth(@Request() req){
        return "OK";
    }
}
