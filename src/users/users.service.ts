import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/roles.enum';
import { User } from './model/user';
import { Employee } from './model/employee';
import { Settings } from './model/settings';

@Injectable()
export class UsersService {
    private users = null;

    constructor(){
        this.users = new Array<User>();

        var user = new User();
        user.companyId = '1';
        var employeeInfo = new Employee();
        employeeInfo.employeeId = 'hello, world';
        user.employeeInfo = employeeInfo;
        user.enableAccount = true;
        user.lastLogin = Date.now();
        var roles = new Array<Role>();
        roles.push(Role.USER);
        user.roles = roles;
        var settings = new Settings();
        settings.language = 'ko';
        user.settings = settings;
        user.userId = 'administrator';
        user.userName = 'administrator';
        user.userPassword = '1111';
        this.users.push(user);
    }

    async findOne(userId: string): Promise<User | undefined> {
        return this.users.find(user => user.userId === userId);
    }
}
