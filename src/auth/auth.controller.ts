import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UseGuards, Request, Get, Put, Patch, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Put('join')
    signUp(@Body() signUpDto: Record<string, any>){
        this.logger.debug(signUpDto);

        const { userId, userPassword, language } = signUpDto;
        const roles = [Role.USER]
        return this.authService.signUp(userId, userPassword, language, roles);
    }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        this.logger.debug(signInDto);
        return this.authService.signIn(signInDto.userId, signInDto.userPassword);
    }


    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.USER;
    }

    @Roles(Role.SUPER_ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Patch('activate')
    setActivate(@Body() params) {
        const { userId, enable } = params;
        return this.authService.setActivation(userId, enable);
    }

    @Roles(Role.SUPER_ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Patch('expiration')
    setExpiration(@Body() params: Record<string, string>) {
        const { userId, expiration_dt } = params;
        const converted_dt = new Date(expiration_dt);

        if(converted_dt.toString() == "Invalid Date"){
            throw new BadRequestException();
        }

        return this.authService.setExpiration(userId, converted_dt);
    }
}
