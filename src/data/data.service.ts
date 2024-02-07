import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DataService {
    private prisma = new PrismaClient();

    async getFormentry(){
        return this.prisma.scf100.findMany();
    }
}
