import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

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
