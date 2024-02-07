import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UseGuards, Request, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/roles/roles.enum';

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
}
