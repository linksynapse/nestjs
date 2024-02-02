import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            companyId: 1,
            userId: 'administrator',
            userName: 'administrator',
            userPassword: '1111',
            employeeInfo: null,
            enableAccount: true,
            permission: ['SUPER_ADMIN','USER'],
            lastLogin: Date.now(),
            settings: {
                language: 'ko'
            },
        },
    ]


    async findOne(userId: string): Promise<User | undefined> {
        return this.users.find(user => user.userId === userId);
    }
}
