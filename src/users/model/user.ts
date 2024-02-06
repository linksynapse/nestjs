import { Role } from "src/roles/roles.enum";
import { Employee } from "./employee";
import { Settings } from "./settings";

export class User {
    companyId: String;
    userId: String;
    userName: String;
    userPassword: String;
    employeeInfo: Employee;
    enableAccount: boolean;
    roles: Role[];
    lastLogin: number;
    settings: Settings;
}
/*
        {
            companyId: 1,
            userId: 'administrator',
            userName: 'administrator',
            userPassword: '1111',
            employeeInfo: null,
            enableAccount: true,
            permission: Role['SUPER_ADMIN'],
            lastLogin: Date.now(),
            settings: {
                language: 'ko'
            },
        },

*/