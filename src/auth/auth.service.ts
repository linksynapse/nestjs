import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.enum';

import { RT_MESSAGE, Auth } from 'src/returns/auth.enum';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(userId: string, userPassword: string): Promise<any> {
        //this.logger.debug(`Try login userId: ${userId}, userPassword: ${userPassword}`);

        const user = await this.usersService.findOne({
            user_id: userId,
        });

        if(!user?.enable){
            //this.logger.debug(`${userId}::Account Not Activated`);
            throw new UnauthorizedException();
        }

        if(user?.expiration_dt !== null){
            if(new Date(user?.expiration_dt).getTime() <= Date.now()){
                //this.logger.debug(`${userId}::${user?.expiration_dt}::Account is expired`);
                throw new UnauthorizedException();
            }
        }
        
        if(!await bcrypt.compare(userPassword, user?.user_pw)) {
            //this.logger.debug(`${userId}::Invalid Password`);
            throw new UnauthorizedException();
        }

        const { ...result } = user;

        const payload = { properties: {
            user_id: result.user_id,
            language: result.language
        } };
        //this.logger.debug(`${userId}::login successfully`);
        return {access_token: await this.jwtService.signAsync(payload)};
    }

    async signUp(userId: string, userPassword: string, language: string, roles: Role[]){
        const user = {
            user_id: userId,
            user_pw: await bcrypt.hash(userPassword, 10),
            language: language,
            roles: roles
        }

        return await this.usersService.createUser(user);
    }

    async setExpiration(userId: string, expiration_dt: Date): Promise<RT_MESSAGE>{
        const where = {
            user_id: userId
        }
        const data = {
            expiration_dt: expiration_dt
        }

        const params = {
            where,
            data
        }

        const user = await this.usersService.updateUser(params);
        if(user !== undefined){
            return {status: Auth.OK, message: 'OK'}
        }else{
            return {status: Auth.UPDATE_ERROR, message: 'ERROR'}
        }
    }

    async setActivation(userId: string, enable: boolean): Promise<RT_MESSAGE>{
        const where = {
            user_id: userId
        }
        const data = {
            enable: enable,
            activated_dt: new Date().toISOString()
        }

        const params = {
            where,
            data
        }

        const user = await this.usersService.updateUser(params);
        if(user !== undefined){
            return {status: Auth.OK, message: 'OK'}
        }else{
            return {status: Auth.UPDATE_ERROR, message: 'ERROR'}
        }
    }

}
