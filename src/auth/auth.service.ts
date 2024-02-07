import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.enum';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(userId: string, userPassword: string): Promise<any> {
        this.logger.debug(`Try login userId: ${userId}, userPassword: ${userPassword}`);

        const user = await this.usersService.findOne({
            companyid_id: {
                companyid: '001', 
                id: userId,
            }
        });
        
        if(!await bcrypt.compare(userPassword, user?.password)) {
            this.logger.debug(`${userId}::Invalid Password`);
            throw new UnauthorizedException();
        }

        const { ...result } = user;

        const payload = { properties: result };
        this.logger.debug(`${userId}::login successfully}`);
        return {access_token: await this.jwtService.signAsync(payload)};
    }

    async signUp(userId: string, userPassword: string, language: string, roles: Role[]){
        const user = {
            companyid: '001',
            id: userId,
            password: await bcrypt.hash(userPassword, 10),
            language: language,
            roles: roles
        }

        return await this.usersService.createUser(user);
    }
}
