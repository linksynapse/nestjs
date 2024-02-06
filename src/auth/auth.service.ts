import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(userId: string, userPassword: string): Promise<any> {
        this.logger.debug(`Try login userId: ${userId}, userPassword: ${userPassword}`);

        const user = await this.usersService.findOne(userId);
        
        if(user?.userPassword !== userPassword) {
            this.logger.debug(`${userId}::Invalid Password`);
            throw new UnauthorizedException();
        }

        const { ...result } = user;

        const payload = { properties: result };
        this.logger.debug(`${userId}::login successfully}`);
        return {access_token: await this.jwtService.signAsync(payload)};
    }
}
