import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, SY_USER } from '@prisma/client';

@Injectable()
export class UsersService {
    private prisma = new PrismaClient();

    constructor() {}

    async findOne(userWhereUniqueInput: Prisma.SY_USERWhereUniqueInput): Promise<SY_USER | undefined> {
        return this.prisma.sY_USER.findUnique({
            where: userWhereUniqueInput
        });
    }

    async createUser(data: Prisma.SY_USERCreateInput): Promise<SY_USER> {
        return this.prisma.sY_USER.create({
            data,
        })
    }

    async updateUser(params: {
        where: Prisma.SY_USERWhereUniqueInput;
        data: Prisma.SY_USERUpdateInput;
    }): Promise<SY_USER> {
        const { where, data } = params;
        return this.prisma.sY_USER.update({
            data,
            where,
        })
    }

    async deleteUser(where: Prisma.SY_USERWhereUniqueInput): Promise<SY_USER> {
        return this.prisma.sY_USER.delete({
            where,
        });
    }
}
